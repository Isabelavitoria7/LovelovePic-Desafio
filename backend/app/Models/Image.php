<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $table = 'images';

    protected $filable = [
        'user_id', // relacionamento com o usuario
        'path' //caminho da imagem
    ];


    //relacionamento com o usuario 
    public function user(){
        return $this->belongsTo(User::class); //1 imagem para 1 usuario
    }

}
