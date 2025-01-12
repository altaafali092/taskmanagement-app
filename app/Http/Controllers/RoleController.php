<?php

namespace App\Http\Controllers;

use App\Http\Requests\Role\StoreRoleRequest;
use Illuminate\Http\Request;
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
        $roles = Role::with('permissions')->orderBy('name', 'asc')->latest()->paginate(10);
        return Inertia::render('Roles/Index', [
            'roles' => $roles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
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
