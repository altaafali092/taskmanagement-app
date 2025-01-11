<?php

namespace App\Models;

use App\Traits\Filetrait;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory,Filetrait;

    protected  $fillable = [
        'name',
        'image',
        'description',
        'status',
        'priority',
        'due_date',
        'created_by',
        'updated_by',
        'project_id',
        'assigned_user_id'
    ];

    protected $casts = [
        'due_date' => 'date:Y-m-d',
    ];
    public function image(): Attribute
    {
        return $this->castingFile(defaultPath: 'task');
    }
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
    public function assignedUser()
    {
        return $this->belongsTo(User::class);
    }
     public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class,'created_by');
    }
    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class,'updated_by');
    }
}


