<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at->diffForHumans(),
            'roles' => $this->whenLoaded('roles', function () {
                return $this->roles->pluck('name'); // Return only role names (or customize as needed)
            }),

            // 'updated_at' => $this->updated_at->diffForHumans(),
            // 'projects' => ProjectResource::collection($this->whenLoaded('projects')),
        ];
    }
}
