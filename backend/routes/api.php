<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UpdateController;
use App\Http\Controllers\ImageController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::put('/dataRelationship', [UpdateController::class, 'dataRelationship']); //salva informações sobre o relacionamento
Route::post('/upload-image', [ImageController::class, 'store']); // carregaga o caminho das imagen spara o bd
Route::get('/user-images/{userId}', [ImageController::class, 'getUserImages']); // recupera imagens


//rota -> controller -> metodo no controller