<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Routing\Controller;

class ProjectController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (!Auth::user()->can('view projects')) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You are not allowed to access Project.',
            ]);
        }

        $query = Project::query();
        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }
        $projects = ProjectResource::collection($query->with(['createdBy', 'updatedBy'])->latest()->paginate(5));
        return Inertia::render('Project/Index', [
            'projects' => fn() => $projects,
            'queryParams' => request()->query() ?: null,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (!Auth::user()->can('create projects')) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You are not allowed to create Project.',
            ]);
        }
        return Inertia::render('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        if (!Auth::user()->can('create projects')) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You are not allowed to create Project.',
            ]);
        }

        Project::create($request->validated() + ['created_by' => Auth::id(), 'updated_by' => Auth::id()]);
        return to_route('project.index')->with('toast', [
            'type' => 'success',
            'message' => ' 🦄 Data saved successfully!',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        if (!Auth::user()->can('view projects')) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You are not allowed to show Project.',
            ]);
        }

        return Inertia::render('Project/Show', [
            'project' => new ProjectResource($project)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        if (!Auth::user()->can('edit projects')) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You are not allowed to edit Project.',
            ]);
        }
        return Inertia::render('Project/Edit', compact('project'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        if (!Auth::user()->can('edit projects')) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You are not allowed to update Project.',
            ]);
        }

        $project->update($request->validated());
        return to_route('project.index')->with('toast', [
            'type' => 'success',
            'message' => 'Project updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        if (!Auth::user()->can('delete projects')) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You are not allowed to delete Project.',
            ]);
        }
        if ($project->image) {
            Storage::delete($project->image);
        }
        $project->delete();
        return back()->with('toast', [
            'type' => 'success',
            'message' => 'Project deleted successfully'
        ]);
    }
}
