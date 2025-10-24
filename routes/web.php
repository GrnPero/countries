<?php

use App\Http\Controllers\CountryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [CountryController::class, 'index'])->name('countries');
