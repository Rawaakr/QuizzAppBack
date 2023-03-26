<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::resource('useer', App\Http\Controllers\API\UserController::class);
Route::resource('competences/', App\Http\Controllers\API\CompetenceController::class);
Route::resource('certificat', App\Http\Controllers\API\CertificatController::class);
