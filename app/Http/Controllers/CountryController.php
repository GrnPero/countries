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

    /**
     * Returns a specific country by its cca3 code
     * 
     * @param string $cca3
     * @return \Inertia\Response
     */
    public function show(string $cca3)
    {
        $country = $this->countryService->getCountryByCca3($cca3);

        if (!$country) {
            abort(404, 'Country not found');
        }

        return Inertia::render('Countries/Show', [
            'country' => $country,
        ]);
    }
}
