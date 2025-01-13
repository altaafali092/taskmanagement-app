<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['string', 'max:255'], // 'sometimes' means it's optional unless provided
            'email' => [ 'string','email','max:255',
                Rule::unique('users')->ignore($this->user)
            ],
            'password' => ['nullable', 'confirmed', Password::min(5)->letters()],
            'role'=>['required','array','exists:roles,name']
        ];

    }
}
