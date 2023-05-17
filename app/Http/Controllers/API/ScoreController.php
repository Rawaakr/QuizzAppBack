<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ScoreController extends Controller
{
    public function update($idComp,$niv,$idUser, $value)
    {
        $idtest = DB::table('tests')
        ->select('id')
        ->where('idCompetence', $idComp)
        ->where('niveau',$niv)
        ->value('id');

        $score =DB ::table('scores')
        ->where('scores.idTest',$idtest)
        ->where('scores.idUser',$idUser)
        ->update(['scores.score' => DB::raw('scores.score + ' . $value)]);

        return response()->json('updated successfully')
        ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    }

}
