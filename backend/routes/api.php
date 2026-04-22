<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\InquiryController;
use Illuminate\Support\Facades\Route;

$registerRoutes = function (): void {
    Route::get('/categories', [CategoryController::class, 'index']);

    Route::get('/courses', [CourseController::class, 'index']);
    Route::get('/courses/{slug}', [CourseController::class, 'show']);
    Route::post('/inquiries', [InquiryController::class, 'store'])
        ->middleware('throttle:10,1');
};

$registerRoutes();

Route::prefix('v1')->group($registerRoutes);
