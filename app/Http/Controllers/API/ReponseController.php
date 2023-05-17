<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReponseController extends Controller
{
    //
    public function show($idQuest)
    {   
        $reponses =DB ::table('reponses')
        ->where('reponses.idQuestion',$idQuest)        
        ->get();
        foreach($reponses as $rep)
        {
        if (is_null($rep)) {
            return response()->json('Data not found', 404); 
        }
        $resultat[]=$rep;
        }
        return response()->json([$resultat])
            ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    }
    public function RepCorrect($idQuest)
    {   
        $reponses =DB ::table('reponses')
        ->where('reponses.idQuestion',$idQuest) 
        ->where('reponses.etat',1)       
        ->get();
        foreach($reponses as $rep)
        {
        if (is_null($rep)) {
            return response()->json('Data not found', 404); 
        }
        $resultat[]=$rep;
        }
        return response()->json([$resultat])
            ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    }
}

