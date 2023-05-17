<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\RepForum;
use Validator;
use Illuminate\Support\Facades\DB;


class RepForumController extends Controller
{
    public function store(Request $request)
{
    $reponse = RepForum::create([
        'idUser' => $request->idUser,
        'idQuestion' => $request->idQuestion,
        'reponse' => $request->reponse,
    ]);

    return response()->json(['RepForum' => $reponse])
    ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    }
    public function showReponse($question){
        $reponses=DB ::table('rep_forums')
        ->join('users', 'rep_forums.idUser', '=', 'users.id')
        ->join('forums', 'rep_forums.idQuestion', '=', 'forums.id')

        ->select('forums.question','users.nom','users.prenom','users.email','rep_forums.reponse')
        ->where('question',$question)->get();
        foreach($reponses as $rep)
        {
        if (is_null($rep)) {
            return response()->json('Data not found', 404); 
        }
        $result[]=$rep;
        }
        return response()->json([$result])
        ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    }

}
