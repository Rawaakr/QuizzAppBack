<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\ForumController;
use App\Http\Controllers\API\RepForumController;


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
/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/
Route::get('useer', [UserController::class,'store']);
Route::get('/login',[UserController::class,'login']);
Route::resource('competences', App\Http\Controllers\API\CompetenceController::class);
Route::resource('certificat', App\Http\Controllers\API\CertificatController::class);
Route::resource('affichage', App\Http\Controllers\API\UserController::class);
Route::resource('education', App\Http\Controllers\API\EducationController::class);
Route::resource('experience', App\Http\Controllers\API\ExperienceController::class);
Route::get('test/show/{idCom}/{niv}', 'App\Http\Controllers\API\TestController@show');
Route::get('score/{idComp}/{niv}/{idUser}/{value}', 'App\Http\Controllers\API\ScoreController@update');
Route::get('reponses/{idQuest}', 'App\Http\Controllers\API\ReponseController@show');
Route::get('repCorr/{idQuest}', 'App\Http\Controllers\API\ReponseController@RepCorrect');
Route::post('forum', [ForumController::class,'store']);
Route::get('/afficheForum',[ForumController::class,'show']);
Route::get('/afficheOne/{email}',[ForumController::class,'showOne']);
Route::post('Repforum', [RepForumController::class,'store']);
Route::get('/afficheReponses/{question}',[RepForumController::class,'showReponse']);
