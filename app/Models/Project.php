<?php

namespace App\Models;

use App\Traits\FilesTrait;
use App\Traits\Filetrait;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory, Filetrait;

    protected  $fillable = [

        'name',
        'image',
        'status',
        'created_at',
        'description',
        'updated_by',
        'created_by',
        'due_date'
    ];

    protected $casts = [
        'due_date' => 'date:Y-m-d',
    ];
    public function image(): Attribute
    {
        return $this->castingFile(defaultPath: 'project');
    }
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
