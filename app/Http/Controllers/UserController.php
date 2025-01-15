<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

use function PHPUnit\Framework\returnSelf;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (!Auth::user()->can('view users')) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You are not allowed to view user.',
            ]);
        }

        $query = User::query();

        $users = UserResource::collection($query->with(['createdBy', 'updatedBy','roles'])->latest()->paginate(5));
        return Inertia::render('User/Index', [
            'users' => fn() => $users,
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (!Auth::user()->can('create users')) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You are not allowed to create user.',
            ]);
        }
        $roles = Role::orderby('name', 'asc')->get();
        return Inertia::render('User/Create', [
            'roles' => $roles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        if (!Auth::user()->can('create users')) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You are not allowed to create user.',
            ]);
        }
       $user=User::create(array_merge(
            $request->validated(),
            ['password' => bcrypt($request->password)]
        ));
        $user->syncRoles($request->role);
        return to_route('user.index')->with('toast', [
            'type' => 'success',
            'message' => 'User created successfully.'
        ]);
    }


    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        if (!Auth::user()->can('edit users')) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You are not allowed to edit user.',
            ]);
        }

        $roles = Role::orderBy('name', 'ASC')->get();
        $hasRoles = $user->roles->pluck('name')->toArray();
        return Inertia::render('User/Edit', [
            'user' => $user,
            'roles' => $roles,
            'hasRoles' => $hasRoles,
        ]);
    }
    public function update(UpdateUserRequest $request, User $user)
    {

        if (!Auth::user()->can('edit users')) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You are not allowed to edit user.',
            ]);
        }
        $user->update(array_merge(
            $request->validated(),
            $request->filled('password') ? ['password' => bcrypt($request->password)] : []
        ));
        $user->syncRoles($request->role);
        return to_route('user.index')->with('toast', [
            'type' => 'success',
            'message' => 'User updated successfully.'
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if (!Auth::user()->can('delete users')) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You are not allowed to delete user.',
            ]);
        }

        if ($user->id == Auth::user()->id) {

            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You cannot delete yourself.'
            ]);
        }
        if ($user->hasRole('Super Admin')) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You cannot delete Super Admin.'
            ]);
        }
        if ($user->status === 1) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'User deleted successfully.'
            ]);
        }
        $user->delete();
        return back();
    }
}
