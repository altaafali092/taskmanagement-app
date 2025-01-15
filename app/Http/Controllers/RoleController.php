<?php

namespace App\Http\Controllers;

use App\Http\Requests\Role\StoreRoleRequest;
use App\Http\Requests\Role\UpdateRoleRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (!Auth::user()->can('view roles')) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You are not allowed to access role.',
            ]);
        }
        $roles = Role::with('permissions')->orderBy('name', 'asc')->latest()->get();
        return Inertia::render('Roles/Index', [
            'roles' => $roles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (!Auth::user()->can('create role')) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You are not allowed to create role.',
            ]);
        }
        $permissions = Permission::orderBy('name', 'asc')->get();
        return Inertia::render('Roles/Create', [
            'permissions' => $permissions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request)
    {
        if (!Auth::user()->can('create role')) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You are not allowed to create role.',
            ]);
        }

        $role = Role::create($request->validated());
        if (!empty($request->permission)) {
            foreach ($request->permission as $name) {
                $role->givePermissionTo($name);
            }
        }
        return to_route('role.index')->with('toast', [
            'type' => 'success',
            'message' => ' Role created successfully!',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        if (!Auth::user()->can('edit role')) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You are not allowed to edit role.',
            ]);
        }
        if($role->name==='superadmin'){
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'Superadmin role cannot be edit!'
            ]);
        }
        $permissions = Permission::orderBy('name', 'ASC')->get(); // Get all permissions
        $hasPermissions = $role->permissions->pluck('name')->toArray();

        return Inertia::render('Roles/Edit', [
            'role' => $role,
            'permissions' => $permissions,
            'hasPermissions' => $hasPermissions, // Pass the role's permissions to the frontend
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, Role $role)
    {
        if (!Auth::user()->can('edit role')) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You are not allowed to edit role.',
            ]);
        }
        $role->update($request->validated());

        if (!empty($request->permission)) {
            $role->syncPermissions($request->permission);
        } else {
            $role->syncPermissions([]);
        } // Sync permissions by IDs
        return to_route('role.index')->with('toast', [
            'type' => 'success',
            'message' => 'Role updated successfully!',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        if (!Auth::user()->can('delete role')) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You are not allowed to edit role.',
            ]);
        }

        if($role->name==='superadmin'){
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'Superadmin role cannot be deleted!'
            ]);
        }
        $role->syncPermissions([]);
        $role->delete();
        return back()->with(
            'toast',
            [
                'type' => 'success',
                'message' => 'Role deleted successfully!'
            ]
        );
    }
}
