<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::resource('useer', App\Http\Controllers\API\UserController::class);
Route::post('/login',[UserController::class,'login']);
Route::resource('competences', App\Http\Controllers\API\CompetenceController::class);
Route::resource('certificat', App\Http\Controllers\API\CertificatController::class);
