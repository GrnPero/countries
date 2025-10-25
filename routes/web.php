<?php

use App\Http\Controllers\CountryController;
use Illuminate\Support\Facades\Route;

Route::get('/', [CountryController::class, 'index'])->name('countries');

Route::get('/countries/{cca3}', [CountryController::class, 'show'])->name('countries.show');
