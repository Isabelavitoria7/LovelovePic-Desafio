<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Jobs\SendBirthdayImage;

Route::get('/', function () {
    return 'Running';
});