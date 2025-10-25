<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\CountryApiService;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\Client\ConnectionException;

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

        $error = null;
        $countries = [];

        try {
            $countries = $this->countryService->getCountries($validated['search'] ?? null);
        } catch (ConnectionException | RequestException $e) {
            Log::error('API connection error fetching countries', ['error' => $e->getMessage()]);
            $error = "Unable to connect to the countries API. Please check your network connection and try again.";
        } catch (\Exception $e) { 
            Log::error('Unexpected error fetching countries', ['error' => $e->getMessage()]);
            $error = "An unexpected error occurred while fetching countries. Please try again later.";
        }

        return Inertia::render('Countries/Index', [
            'countries' => $countries,
            'error' => $error,
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
        $country = null;
        $error = null;

        try {
            $country = $this->countryService->getCountryByCca3($cca3);
         } catch (ConnectionException | RequestException $e) {
            Log::error('API connection error fetching country', [
                'cca3' => $cca3,
                'error' => $e->getMessage(),
            ]);

            $error = "Unable to connect to the countries API. Please check your network connection and try again.";
        } catch (\Exception $e) {
            Log::error('Unexpected error fetching country', [
                'cca3' => $cca3,
                'error' => $e->getMessage(),
            ]);

            $error = "An unexpected error occurred while fetching the country. Please try again later.";
        }

        return Inertia::render('Countries/Show', [
            'error' => $error,
            'country' => $country,
        ]);
    }
}
