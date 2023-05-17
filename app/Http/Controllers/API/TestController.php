<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TestController extends Controller
{
    public function show($idCom,$niv)
    {   
        $idtest = DB::table('tests')
        ->select('id')
        ->where('idCompetence', $idCom)
        ->where('niveau',$niv)
        ->value('id');
        
        $Questions = DB::table('questions')
        ->select('qst')
        ->where('idTest',$idtest)
        ->get();
        foreach($Questions as $qst)
        {
        if (is_null($qst)) {
            return response()->json('Data not found', 404); 
        }
        $result[]=$qst;
        }
        return response()->json([$result]);
    
    }
}
