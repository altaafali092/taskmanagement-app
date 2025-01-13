<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionsSeeder extends Seeder
{
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Define permissions
        $permissions = [
            'view users',
            'edit users',
            'delete users',
            'create users',
            'view tasks',
            'edit tasks',
            'delete tasks',
            'create tasks',
            'view projects',
            'edit projects',
            'delete projects',
            'create projects',
            'view roles',
            'edit roles',
            'delete roles',
            'create roles',

        ];

        // Create permissions
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }


    }
}
