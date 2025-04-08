<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Image;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function store(Request $request){
        $request -> validate([
            'user_id' => 'required|exists:users,id',
            'images' => 'required', //o array com as imagens
            'images.*' => 'required|image|mimes:jpeg,png,jpg|max:2048', //valida esses formatos para segurança
        ]);

        $uploadedImages = [];

        foreach ($request->file('images') as $image) {
            $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads'), $filename);
        
            // Salva o caminho no banco de dados (relativo ao public/)
            $newimage = new Image();
            $newimage->user_id = $request->user_id;
            $newimage->path = 'uploads/' . $filename;
            $newimage->save();
        
            // Adiciona a URL acessível
            $uploadedImages[] = asset('uploads/' . $filename);
        }



        return response()->json([
            'message' => 'Images uploaded successfully',
            'image_URL' => $uploadedImages,
        ], 200);

    }

    public function getUserImages($userId){

        //busca no banco de dados associado ao userId
        $images = Image::where('user_id', $userId)->pluck('path'); //retorna um array apenas com os caminhos das imagens

        return response()->json($images);
    }

}
