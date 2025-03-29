<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;


class AuthController extends Controller
{
    public function register(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Criptografando a senha
        ]);

        Auth::login($user);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
    }

    public function login(Request $request){
    
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
 
        // Verifica se as credenciais estão corretas
        if (Auth::attempt($credentials)) {

            // Obtém o usuário autenticado
            $user = Auth::user();

            // Retorna a resposta com os dados do usuário necessários
            return response()->json([
                'user' => [
                'id'=> $user->id,
                'name' => $user->name,
                'nameCasal' => $user->nameCasal, 
            ],
                'message' => 'Login successful',
            ], 200);
        }

        // Retorna erro se as credenciais não forem válidas
        return response()->json([
            'message' => 'The provided credentials do not match our records.',
        ], 401);
        }
}

