<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExperienceController extends Controller
{
    public function show($email)
    {   
        $experiences =DB ::table('experiences')
        ->join('users', 'experiences.idUseer', '=', 'users.id')
        ->select('experiences.id','experiences.annee_debut','experiences.annee_fin','experiences.annee_debut','experiences.titre','experiences.description','experiences.idUseer','users.nom','users.prenom','users.email')
        ->where('users.email',$email)        
        ->get();
        foreach($experiences as $exp)
        {
        if (is_null($exp)) {
            return response()->json('Data not found', 404); 
        }
        $result[] = $exp;
        }
        return response()->json([$result])
            ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');;
    }
}
