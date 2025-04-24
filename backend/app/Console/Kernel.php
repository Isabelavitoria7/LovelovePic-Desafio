<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{

    //eu preciso utilizar o metodo Schedule para que os comandos artisan personalizados passe por aqui para serem processados e guardados na lista de tarefas, mas lá em routes/console.php ja estou fazendo isso, e o Kernel já carrega
    // protected function commands()
    // {
    //     require base_path('routes/console.php');
    // }  automaticamente por baixo dos panos.


    //como seria se eu fosse agendar por aqui
    // protected $commands = [];

    
    // protected function schedule(Schedule $schedule): void
    // {
    //     // Agendo o job SendBirthdayImage para rodar todo dia 
    //     $schedule->job(new \App\Jobs\SendBirthdayImage)->everyMinute()->timezone('America/Sao_Paulo');
    // }

    
    // protected function commands(): void
    // {
    //     $this->load(__DIR__.'/Commands');

    //     require base_path('routes/console.php');
    // }
}
