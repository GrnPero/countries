<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\CountryApiService;

class CountryController extends Controller
{
    protected $countryService;

    public function __construct(CountryApiService $countryService)
    {
        $this->countryService = $countryService;
    }

    /**
     * Returns all the countries
     * 
     * @param Request $request
     * @return \Inertia\Response 
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'search' => 'nullable|string|max:255',
        ]);

        // Leverage the CountryApiService to fetch countries if needed
        $countries = $this->countryService->getCountries($validated['search'] ?? null);

        return Inertia::render('Countries/Index', [
            'countries' => $countries,
        ]);
    }
}
