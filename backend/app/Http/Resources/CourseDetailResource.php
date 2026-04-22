<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CourseDetailResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $showPrice = $this->show_price ?? true;

        return [
            'id'                => $this->id,
            'title'             => $this->title,
            'slug'              => $this->slug,
            'short_description' => $this->short_description,
            'full_description'  => $this->full_description,

            'category' => $this->whenLoaded('category', fn () => [
                'name' => $this->category->name,
                'slug' => $this->category->slug,
            ]),

            'pricing' => [
                'price'            => $showPrice && $this->price !== null ? (float) $this->price : null,
                'discounted_price' => $showPrice && $this->discounted_price !== null ? (float) $this->discounted_price : null,
                'currency'         => $this->currency,
                'razorpay_link'    => $showPrice ? $this->razorpay_link : null,
                'show_price'       => $showPrice,
            ],

            'thumbnail_url' => $this->thumbnail
                ? Storage::disk('public')->url($this->thumbnail)
                : null,

            'banner_url' => $this->banner
                ? Storage::disk('public')->url($this->banner)
                : null,

            'level'              => $this->level,
            'duration'           => $this->duration,
            'delivery_mode'      => $this->delivery_mode,
            'certification_info' => $this->certification_info,
            'target_audience'    => $this->target_audience,
            'featured'           => $this->featured,

            // Repeater fields normalised to clean arrays
            'highlights'        => $this->normaliseItems($this->highlights, 'item'),
            'learning_outcomes' => $this->normaliseItems($this->learning_outcomes, 'item'),

            'syllabus' => collect($this->syllabus ?? [])->map(fn (array $row) => [
                'title'       => $row['module'] ?? null,
                'description' => $row['description'] ?? null,
            ])->values()->all(),

            'faqs' => collect($this->faqs ?? [])->map(fn (array $row) => [
                'question' => $row['question'] ?? null,
                'answer'   => $row['answer'] ?? null,
            ])->values()->all(),

            'seo' => [
                'meta_title'       => $this->meta_title ?: $this->title,
                'meta_description' => $this->meta_description,
            ],
        ];
    }

    /**
     * Flatten a Filament Repeater array like [["item" => "foo"], ...] to ["foo", ...].
     */
    private function normaliseItems(?array $rows, string $key): array
    {
        return collect($rows ?? [])->pluck($key)->filter()->values()->all();
    }
}
