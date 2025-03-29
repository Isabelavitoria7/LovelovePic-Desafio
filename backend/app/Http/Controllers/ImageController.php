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

        forEach($request->file('images') as $image){
            $imagePath = $image->store('uploads', 'public'); //salva na pasta uploads dentro de storage/app/public
            
            //slava id e caminho da imagem no bd e associa com o usuario
            $newimage = new Image();
            $newimage->user_id = $request->user_id;
            $newimage->path = $imagePath;
            $newimage->save();

            $uploadedImages[] = Storage::url($imagePath); //metodo asset para pegar a url completa da imagem salva em storage/app/public/uploads 
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
