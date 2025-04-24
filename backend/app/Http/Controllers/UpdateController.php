<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Models\User;

class UpdateController extends Controller
{
    public function dataRelationship(Request $request){

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'nameCasal' => 'required|string|max:255',
            'tempo' => 'required|date',
            'text' => 'nullable|string',
        ]);

        

        $user = User::find($request->user_id); //encontra o usuario pelo id
        if(!$user){
            return response()->json([
                "message" => "User not found"
            ],404);
        }

        $user->update([
            "nameCasal" => $request->nameCasal,
            "tempo" => $request->tempo,
            "text" => $request->text
        ]);
    

        return response()->json([
            "message" => "Data relationship update successfully",
        ], 200);
    }
}
