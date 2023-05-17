<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Forum;
use Validator;
use Illuminate\Support\Facades\DB;


class ForumController extends Controller
{
    public function store(Request $request)
{
    $forum = Forum::create([
        'idUser' => $request->idUser,
        'question' => $request->question,
    ]);

    return response()->json(['forum' => $forum])
    ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    }

    public function show(){
        $forums = Forum::all();
        return response()->json([$forums])
        ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    }

    public function showOne($email){
        $forums=DB ::table('forums')
        ->join('users', 'forums.idUser', '=', 'users.id')
        ->select('forums.id','forums.idUSer','forums.question','users.nom','users.prenom','users.email')
        ->where('email',$email)->get();
        foreach($forums as $forum)
        {
        if (is_null($forum)) {
            return response()->json('Data not found', 404); 
        }
        $result[]=$forum;
        }
        return response()->json([$result])
        ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    }
}
