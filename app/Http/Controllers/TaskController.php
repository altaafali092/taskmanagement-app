<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();
        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }
        $tasks = TaskResource::collection($query->with(['createdBy', 'updatedBy'])->latest()->paginate(10));
        return Inertia::render('Task/Index', [
            'tasks' => fn() => $tasks,
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = ProjectResource::collection(Project::latest()->get())->toArray(request());
        $users = UserResource::collection(User::latest()->get())->toArray(request());
        return Inertia::render('Task/Create',[
            'projects' => $projects,
            'users' => $users
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        Task::create($request->validated()+['created_by'=> Auth::user()->id,'updated_by'=> Auth::user()->id]);

        return to_route('task.index')->with('toast', [
            'type' =>'success',
           'message' => ' Task created successfully!',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return Inertia::render('Task/Show', [
            'task' => new TaskResource($task)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = ProjectResource::collection(Project::latest()->get())->toArray(request());
        $users = UserResource::collection(User::latest()->get())->toArray(request());

        return Inertia::render('Task/Edit', [
            'task' => $task,
            'projects' => $projects,
            'users'=>$users,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::user()->id;
        $task->update($data);
        return to_route('task.index')->with('toast', [
            'type' => 'success',
            'message' => 'Task updated successfully.',
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();
        return back()->with('toast', [
            'type' => 'success',
            'message' => 'Task deleted successfully.'
        ]);
    }
    public function myTask()
    {

        $user = auth()->user();
        $query = Task::query()->where('assigned_user_id', $user->id);

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('status')) {
            $query->where('status', request('status'));
        }

        $tasks = TaskResource::collection($query->with(['createdBy', 'updatedBy'])->latest()->paginate(10));

        return Inertia::render('Task/Index', [
            'tasks' => fn() => $tasks,
            'queryParams' => request()->query() ?: null,
        ]);
    }
}

