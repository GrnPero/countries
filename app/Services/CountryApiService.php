<?php

namespace App\Services;

use Illuminate\Http\Client\RequestException;
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
     * @param string|null $search
     * @return array
     */
    public function getCountries(string|null $search): array
    {
        $url = $this->apiUrl . ($search ? 'name/' . urlencode($search) : 'all');
        
        try {
            $response = Http::timeout(5)->get($url, [
                'fields' => 'name,flags,cca3',
            ])->throw();

            return $response->json();
        } catch (RequestException $e) {
            if ($e->getCode() === 404) {
                return [];
            }
            throw $e;
        }
    }

    /**
     * Get country details by its cca3 code
     * 
     * @param string $cca3
     * @return array|null
     */
    public function getCountryByCca3(string $cca3): ?array
    {
        $response = Http::timeout(5)->get($this->apiUrl . "alpha/{$cca3}")->throw();

        if ($response->successful()) {
            $data = $response->json();
            return $data[0] ?? null;
        } else if ($response->status() === 404) {
            return null;
        }

        return null;
    }
}