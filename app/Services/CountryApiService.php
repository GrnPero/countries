<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class CountryApiService
{
    protected $apiUrl;

    public function __construct()
    {
        $this->apiUrl = config('country.base_url');
    }

    /**
     * Get all countries from the external API
     *
     * @return array
     */
    public function getCountries(string|null $search): array
    {
        if ($search) {
            $this->apiUrl .= 'name/' . urlencode($search);
        } else {
            $this->apiUrl .= 'all';
        }

        $response = Http::get($this->apiUrl, [
            'fields' => 'name,flags,cca3',
        ]);

        if ($response->successful()) {
            return $response->json();
        }

        return [];
    }

    /**
     * Get country details by its cca3 code
     * 
     * @param string $cca3
     * @return array|null
     */
    public function getCountryByCca3(string $cca3): ?array
    {
        $response = Http::get($this->apiUrl . "alpha/{$cca3}");
        if ($response->successful()) {
            $data = $response->json();
            return $data[0] ?? null;
        }

        return null;
    }
}