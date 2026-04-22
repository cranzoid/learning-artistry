<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CourseCardResource;
use App\Http\Resources\CourseDetailResource;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class CourseController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $courses = Course::published()
            ->with('category:id,name,slug')
            ->when($request->boolean('featured'), fn ($q) => $q->where('featured', true))
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = trim((string) $request->string('search'));

                $query->where(function ($query) use ($search) {
                    $query
                        ->where('title', 'like', "%{$search}%")
                        ->orWhere('short_description', 'like', "%{$search}%")
                        ->orWhere('full_description', 'like', "%{$search}%");
                });
            })
            ->when($request->filled('category'), fn ($q) => $q->whereHas(
                'category', fn ($q) => $q->where('slug', $request->category)
            ))
            ->when($request->filled('level') && $request->string('level')->lower()->value() !== 'all', function ($query) use ($request) {
                $level = Str::lower(trim((string) $request->string('level')));

                $query->whereRaw('LOWER(level) = ?', [$level]);
            })
            ->when($request->string('sort')->value() === 'price-asc', fn ($q) => $q->orderBy('price'))
            ->when($request->string('sort')->value() === 'price-desc', fn ($q) => $q->orderByDesc('price'))
            ->when(! in_array($request->string('sort')->value(), ['price-asc', 'price-desc'], true), fn ($q) => $q
                ->orderByDesc('featured')
                ->latest('updated_at'))
            ->paginate($request->integer('per_page', 12));

        return CourseCardResource::collection($courses);
    }

    public function show(string $slug): JsonResource
    {
        $course = Course::published()
            ->with('category:id,name,slug')
            ->where('slug', $slug)
            ->firstOrFail();

        return new CourseDetailResource($course);
    }
}
