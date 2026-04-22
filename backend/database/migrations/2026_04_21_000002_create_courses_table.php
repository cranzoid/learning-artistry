<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();

            // Relationships
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();

            // Basic Info
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('short_description')->nullable();
            $table->longText('full_description')->nullable();

            // Pricing
            $table->decimal('price', 10, 2)->nullable();
            $table->decimal('discounted_price', 10, 2)->nullable();
            $table->string('currency', 10)->default('INR');
            $table->boolean('show_price')->default(true);

            // Media
            $table->string('thumbnail')->nullable();
            $table->string('banner')->nullable();

            // Course Details
            $table->string('level')->nullable(); // Beginner, Intermediate, Advanced
            $table->string('duration')->nullable(); // e.g. "6 weeks", "20 hours"
            $table->string('delivery_mode')->nullable(); // Online, Offline, Hybrid
            $table->text('certification_info')->nullable();

            // Content Blocks (JSON)
            $table->json('highlights')->nullable();
            $table->json('learning_outcomes')->nullable();
            $table->text('target_audience')->nullable();
            $table->json('syllabus')->nullable();
            $table->json('faqs')->nullable();

            // Payment
            $table->string('razorpay_link')->nullable();

            // Publishing
            $table->boolean('featured')->default(false);
            $table->string('status')->default('draft'); // draft, published, archived

            // SEO
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
