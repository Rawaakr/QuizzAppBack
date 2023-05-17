<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\Models\certificat;
use Illuminate\Support\Facades\DB;


class CertificatController extends Controller
{
    public function show($email)
    {   
        $certificats = DB::table('certificats')
        ->join('users', 'certificats.idUser', '=', 'users.id')
        ->join('competences', 'certificats.idCompetence', '=', 'competences.id')
        ->where('users.email', $email)
        ->where('statut',1)
        ->get();
        foreach($certificats as $certif)
        {
        if (is_null($certif)) {
            return response()->json('Data not found', 404); 
        }
        
        $result[] = $certif;
        }
        return response()->json([$result])
        ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');;
    
    }
}
