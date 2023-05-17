<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\Models\competence;
use App\Http\Resources\CompetenceResource;
use Illuminate\Support\Facades\DB;


class CompetenceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $competences = competence::latest()->get();
 
        return response()->json([CompetenceResource::collection($competences),'competence fetched.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  string $nom
     * @return \Illuminate\Http\Response
     */
    public function show($nom)
    {   
        $competences =DB ::table('competences')->where('nom',$nom)->get();
        foreach($competences as $comp)
        {
        if (is_null($comp)) 
            return response()->json('Data not found', 404); 
        }
        
        return response()->json([new CompetenceResource($comp)]);
    
    }


}
