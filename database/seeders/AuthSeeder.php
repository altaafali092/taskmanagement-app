<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class AuthSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $superAdminRole = Role::firstOrCreate(['name' => 'superadmin']);

         User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password'),
        ]);


        // $user->assignRole($superAdminRole);
    }
}
