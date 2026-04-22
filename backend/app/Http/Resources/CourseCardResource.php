<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CourseCardResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $showPrice = $this->show_price ?? true;

        return [
            'id'                => $this->id,
            'title'             => $this->title,
            'slug'              => $this->slug,
            'short_description' => $this->short_description,

            'category' => $this->whenLoaded('category', fn () => [
                'name' => $this->category->name,
                'slug' => $this->category->slug,
            ]),

            'pricing' => [
                'price'            => $showPrice && $this->price !== null ? (float) $this->price : null,
                'discounted_price' => $showPrice && $this->discounted_price !== null ? (float) $this->discounted_price : null,
                'currency'         => $this->currency,
                'show_price'       => $showPrice,
            ],

            'thumbnail_url' => $this->thumbnail
                ? Storage::disk('public')->url($this->thumbnail)
                : null,

            'level'         => $this->level,
            'duration'      => $this->duration,
            'delivery_mode' => $this->delivery_mode,
            'featured'      => $this->featured,
        ];
    }
}
