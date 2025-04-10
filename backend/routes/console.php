<?php

use Illuminate\Foundation\Console\ClosureCommand;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use App\Jobs\SendBirthdayImage;

Artisan::command('send:birthday-images', function () {
    \Log::info('[SERVICE] veio');
    (new \App\Jobs\SendBirthdayImage())->handle(); 
    $this->info('Job SendBirthdayImage despachado!');
});

Schedule::command('send:birthday-images')->dailyat('08:00')->timezone('America/Sao_Paulo');