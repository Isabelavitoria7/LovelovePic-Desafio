<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UpdateController;
use App\Http\Controllers\ImageController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::put('/dataRelationship', [UpdateController::class, 'dataRelationship']);
Route::post('/upload-image', [ImageController::class, 'store']);
Route::get('/user-images/{userId}', [ImageController::class, 'getUserImages']);


//rota -> controller -> metodo no controller