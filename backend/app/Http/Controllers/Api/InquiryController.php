<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class InquiryController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'          => ['required', 'string', 'max:255'],
            'email'         => ['required', 'email', 'max:255'],
            'organisation'  => ['nullable', 'string', 'max:255'],
            'inquiry_type'  => ['required', Rule::in(['individual', 'corporate', 'press'])],
            'message'       => ['required', 'string', 'min:10', 'max:5000'],
        ]);

        Inquiry::create($validated);

        return response()->json(['message' => 'Inquiry received. We\'ll be in touch.'], 201);
    }
}
