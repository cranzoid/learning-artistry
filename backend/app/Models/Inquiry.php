<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Inquiry extends Model
{
    protected $fillable = [
        'name',
        'email',
        'organisation',
        'inquiry_type',
        'message',
        'status',
        'notes',
        'replied_at',
    ];

    protected $casts = [
        'replied_at' => 'datetime',
    ];

    public function scopeNew(Builder $query): Builder
    {
        return $query->where('status', 'new');
    }

    public function scopeUnreplied(Builder $query): Builder
    {
        return $query->whereIn('status', ['new', 'read']);
    }

    public function markRead(): void
    {
        if ($this->status === 'new') {
            $this->update(['status' => 'read']);
        }
    }
}
