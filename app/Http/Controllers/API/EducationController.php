<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EducationController extends Controller
{
    public function show($email)
    {   
        $education =DB ::table('education')
        ->join('users', 'education.idUseer', '=', 'users.id')
        ->select('education.id','education.annee_debut','education.annee_fin','education.annee_debut','education.titre','education.description','education.idUseer','users.nom','users.prenom','users.email')
        ->where('users.email',$email)        
        ->get();
        foreach($education as $educ)
        {
        if (is_null($educ)) {
            return response()->json('Data not found', 404); 
        }
        $result[] = $educ;
        }
        return response()->json([$result])
        ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');;
    
    }
}
