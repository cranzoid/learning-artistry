<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Course extends Model
{
    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'short_description',
        'full_description',
        'price',
        'discounted_price',
        'currency',
        'show_price',
        'thumbnail',
        'banner',
        'level',
        'duration',
        'delivery_mode',
        'certification_info',
        'highlights',
        'learning_outcomes',
        'target_audience',
        'syllabus',
        'faqs',
        'razorpay_link',
        'featured',
        'status',
        'meta_title',
        'meta_description',
    ];

    protected $casts = [
        'price'             => 'decimal:2',
        'discounted_price'  => 'decimal:2',
        'show_price'        => 'boolean',
        'highlights'        => 'array',
        'learning_outcomes' => 'array',
        'syllabus'          => 'array',
        'faqs'              => 'array',
        'featured'          => 'boolean',
    ];

    protected static function booted(): void
    {
        static::creating(function (Course $course) {
            if (empty($course->slug)) {
                $course->slug = Str::slug($course->title);
            }
        });

        static::updating(function (Course $course) {
            if ($course->isDirty('title') && ! $course->isDirty('slug')) {
                $course->slug = Str::slug($course->title);
            }
        });
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }
}
