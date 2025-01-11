<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     *
     */
    public static $wrap = false;
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'due_date' => (new Carbon($this->due_date))->format('Y-m-d'),
            'priority' => $this->priority,
            'status' => $this->status,
            'image' => $this->image,
            'project_id' => $this->project_id,
            'project' => new ProjectResource($this->project),
            'createdBy' =>  new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
            'assignedUser' => $this->assignedUser ?  new UserResource($this->assignedUser) : null,
            'assignedUser' => $this->assigned_user_id,
        ];
    }
}
