<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Database\Factories\ProjectFactory;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory()->create([
            'name' => 'Ali',
            'email' => 'ali@example.com',
            'password' => bcrypt('password'),

        ]);

        Project::factory()
        ->count(10)
        ->hasTasks(10)
        ->create();
    }
}
