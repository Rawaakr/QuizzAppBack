<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\Models\certificat;
use Illuminate\Support\Facades\DB;


class CertificatController extends Controller
{
    public function show($nom)
    {   
        $certificats = DB::table('certificats')
        ->join('users', 'certificats.idUser', '=', 'users.id')
        ->join('competences', 'certificats.idCompetence', '=', 'competences.id')
        ->where('users.nom', $nom)
        ->get();
        foreach($certificats as $certif)
        {
        if (is_null($certif)) 
            return response()->json('Data not found', 404); 
        }
        
        return response()->json([$certif]);
    
    }
}
