<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Defina os comandos Artisan customizados, se houver.
     */
    protected $commands = [];

    /**
     * Agendamento de tarefas (jobs, comandos, etc).
     */
    protected function schedule(Schedule $schedule): void
    {
        // Agendo o job SendBirthdayImage para rodar todo dia 
        $schedule->job(new \App\Jobs\SendBirthdayImage)->dailyAt('08:00')->timezone('America/Sao_Paulo');
    }

    /**
     * Registra os comandos Artisan para o app.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
