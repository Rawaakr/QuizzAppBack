<?php
/*
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\Models\User;
use App\Http\Resources\Useer;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{

    function login(Request $request)
    {
        $user= User::where('email', $request->email)->first();
        // print_r($data);
            if (!$user || !Hash::check($request->password, $user->password)) {
                return response([
                    'message' => ['These credentials do not match our records.']
                ], 404);
            }
        
             $token = $user->createToken('my-app-token')->plainTextToken;
        
            $response = [
                'message' => ['verified']
            ];
        
             return response($response, 201);
    }

    public function index()
    {
        $users = User::latest()->get();
 
        return response()->json([Useer::collection($users),'User fetched.']);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'nom' => 'required|string|max:255',
            'prenom' => 'required',
            'telephone' => 'required',
            'education' => 'required',
            'experience' => 'required',
            'description' => 'required',
            'skills' => 'required',
            'social' => 'required',
            'email' => 'required',
            'login' => 'required',
            'password' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());       
        }

        $users = User::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'telephone' => $request->telephone,
            'education' => $request->education,
            'experience' => $request->experience,
            'description' => $request->description,
            'skills' => $request->skills,
            'social' => $request->social,
            'email' => $request->email,
            'login' => $request->login,
            'password' => $request->password
         ]);
        
        return response()->json(['user created successfully.', new Useer($users)]);
    }

    public function show($email)
    {
        $users =DB ::table('users')->where('email',$email)->get();
        foreach($users as $user)
        {
        if (is_null($user)) 
            return response()->json('Data not found', 404); 
        }
        
        return response()->json([new Useer($user)]);
    }


    public function update(Request $request, User $users)
    {
        $validator = Validator::make($request->all(),[
            'nom' => 'required|string|max:255',
            'prenom' => 'required',
            'telephone' => 'required',
            'education' => 'required',
            'experience' => 'required',
            'description' => 'required',
            'skills' => 'required',
            'social' => 'required',
            'email' => 'required',
            'login' => 'required',
            'password' => 'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());       
        }

        $users->nom = $request->nom; 
        $users->prenom = $request->prenom;
        $users->telephone = $request->telephone;
        $users->education = $request->education;
        $users->experience = $request->experience;
        $users->description = $request->description;
        $users->skills = $request->skills;
        $users->social = $request->social;
        $users->email = $request->email;
        $users->login = $request->login;
        $users->password = $request->password;
        $users->save();
        
        return response()->json(['User updated successfully.', new Useer($users)]);
    }


    public function destroy(User $users)
    {
        $users->delete();

        return response()->json('User deleted successfully');
    }
}*/


namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\Models\User;
use App\Http\Resources\Useer;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{

    /*function login(Request $request)
    {
        $user= User::where('email', $request->email)->first();
        // print_r($data);
            if (!$user || !Hash::check($request->password, $user->password)) {
                return response([
                    'message' => ['These credentials do not match our records.']
                ], 404);
            }
        
             $token = $user->createToken('my-app-token')->plainTextToken;
        
            $response = [
                'verified'
            ];
        
             return response($response, 201);
    }*/
    
    function login(Request $request)
    {
        $user= User::where('email', $request->email)->first();
        // print_r($data);
            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json('Invalid');
            }
        
             $token = $user->createToken('my-app-token')->plainTextToken;
        
            $response = 'verified';
        
             return response()->json($response);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::latest()->get();
 
        return response()->json([Useer::collection($users),'User fetched.']);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'nom' => 'required|string|max:255',
            'prenom' => 'required',
            'telephone' => 'required',
            'description' => 'required',
            'image' => 'required',
            'adresse' => 'required',
            'social' => 'required',
            'email' => 'required',
            'login' => 'required',
            'password' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());       
        }

        $users = User::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'telephone' => $request->telephone,
            'description' => $request->description,
            'social' => $request->social,
            'image' => $request->image,
            'adresse' => $request->adresse,
            'email' => $request->email,
            'login' => $request->login,
            'password' => Hash::make($request->password)
        ]);
        
        return response()->json(['user created successfully.', new Useer($users)]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($email)
    {
        $users =DB ::table('users')->where('email',$email)->get();
        foreach($users as $user)
        {
        if (is_null($user)) 
            return response()->json('Data not found', 404); 
        }
        
        return response()->json([new Useer($user)]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $users)
    {
        $validator = Validator::make($request->all(),[
            'nom' => 'required|string|max:255',
            'prenom' => 'required',
            'telephone' => 'required',
            'description' => 'required',
            'image' => 'required',
            'adresse' => 'required',
            'social' => 'required',
            'email' => 'required',
            'login' => 'required',
            'password' => 'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());       
        }

        $users->nom = $request->nom; 
        $users->prenom = $request->prenom;
        $users->telephone = $request->telephone;
        $users->description = $request->description;
        $users->image = $request->image;
        $users->adresse = $request->adresse;
        $users->social = $request->social;
        $users->email = $request->email;
        $users->login = $request->login;
        $users->password = Hash::make($request->password);

        $users->save();
        
        return response()->json(['User updated successfully.', new Useer($users)]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $users)
    {
        $users->delete();

        return response()->json('User deleted successfully');
    }
}

