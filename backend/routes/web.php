<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// apiResource create all the methods predefined so no need to write the routes for each method
// Route::middleware('api')->group(function () {
//     Route::apiResource('/users', UserController::class);
// });

// Route::post('/api/users-store', [UserController::class, 'store'])->name('store');


