<?php

namespace App\Jobs;

use Carbon\Carbon; //para lidar com datas
use Illuminate\Support\Facades\Mail;
use App\Mail\BirthdayImageMail; // responsável pela montagem do corpo do email
use App\Models\User;
use App\Models\Image;

class SendBirthdayImage
{
    public function handle(): void
    {
        \Log::info('[SERVICE] Executando SendBirthdayImage');
        $today = Carbon::today()->format('m-d');

        $users = User::whereRaw("DATE_FORMAT(tempo, '%m-%d') = ?", [$today])->get();

        \Log::info("[SERVICE] Usuários aniversariantes: " . $users->count());

        foreach ($users as $user) {
            $images = Image::where('user_id', $user->id)
                ->limit(6)
                ->pluck('path')
                ->toArray();

            if (empty($images)) continue;

            $imagePath = $this->createImageAniversario($user, $images);
            if (!$imagePath) {
                \Log::warning("[SERVICE] Falha ao criar imagem para usuário {$user->id}");
                continue;
            }
            
            Mail::to($user->email)->send(new BirthdayImageMail($imagePath, $user));
            \Log::info("[SERVICE] Imagem gerada em: " . public_path($imagePath));
        }
    }

    private function createImageAniversario($user, $images)
{
    $width = 1080;
    $height = 1920;
    $centerX = floor($width / 2);

    $imageAniversario = imagecreatetruecolor($width, $height);

    $backgroundPath = public_path('images/fundo.png');
    if (!file_exists($backgroundPath)) {
        return null;
    }

    $background = imagecreatefrompng($backgroundPath);
    imagecopyresampled($imageAniversario, $background, 0, 0, 0, 0, $width, $height, imagesx($background), imagesy($background));

    $fontPath = public_path('fonts/Roboto-Medium.ttf');
    if (!file_exists($fontPath)) {
        return null;
    }

    $corTexto = imagecolorallocate($imageAniversario, 0, 0, 0);
    $mensagem = $user->text ?? 'Feliz aniversário!';
    $fontSize = 32;
    $angle = 0;
    $maxWidth = 900;

    //para quebrar o texto quando for muito grande
    $words = explode(' ', $mensagem);
    $line = '';
    $lines = [];

    foreach ($words as $word) {
        $testLine = trim($line . ' ' . $word);
        $box = imagettfbbox($fontSize, $angle, $fontPath, $testLine);
        $lineWidth = $box[2] - $box[0];

        if ($lineWidth > $maxWidth && $line !== '') {
            $lines[] = trim($line);
            $line = $word;
        } else {
            $line = $testLine;
        }
    }
    $lines[] = trim($line);

    $lineHeight = abs($box[7] - $box[1]);
    $totalHeight = count($lines) * $lineHeight;
    $startY = ($height / 4) - ($totalHeight / 2);

    foreach ($lines as $i => $lineText) {
        $box = imagettfbbox($fontSize, $angle, $fontPath, $lineText);
        $textWidth = $box[2] - $box[0];
        $posX = ($width - $textWidth) / 2;
        $posY = $startY + ($i * $lineHeight);
        // Desenha o linha a linha
        imagettftext($imageAniversario, $fontSize, $angle, $posX, $posY, $corTexto, $fontPath, $lineText);
    }

    // Medidas da caixa do texto
    $textBox = imagettfbbox($fontSize, $angle, $fontPath, $mensagem);
    $textWidth = $textBox[2] - $textBox[0];
    $textHeight = $textBox[1] - $textBox[7];

    // Centralização
    $posX = ($width - $textWidth) / 2;
    $posY = ($height - $textHeight) / 4; // você pode ajustar esse valor pra deixar mais acima ou abaixo


    // Colagem das imagens
    $imageSize = 350;
    $margin = 40;
    $startYimg = $startY + $totalHeight + 60; //para começar as imagens depois do 

    foreach ($images as $index => $imagePath) {
        $col = $index % 2;
        $row = floor($index / 2);

        $posX = $col == 0 ? $centerX - $imageSize - $margin / 2 : $centerX + $margin / 2;
        $posY = $startYimg + ($row * ($imageSize + $margin));

        $userImagePath = public_path($imagePath);
        if (!file_exists($userImagePath)) continue;

        $imageInfo = getimagesize($userImagePath);
        $mimeType = $imageInfo['mime'] ?? '';

        switch ($mimeType) {
            case 'image/jpeg':
                $userImage = imagecreatefromjpeg($userImagePath);
                break;
            case 'image/png':
                $userImage = imagecreatefrompng($userImagePath);
                break;
            case 'image/gif':
                $userImage = imagecreatefromgif($userImagePath);
                break;
            default:
                continue 2;
        }

        imagecopyresampled(
            $imageAniversario,
            $userImage,
            $posX, $posY,
            0, 0,
            $imageSize, $imageSize,
            imagesx($userImage), imagesy($userImage)
        );

        imagedestroy($userImage);
    }

    $nomeArquivo = 'comemorativo_'. $user->nameCasal .'_'.time().'.jpg';
    $caminhoFinal = 'comemorativos/'.$nomeArquivo;
    imagejpeg($imageAniversario, public_path($caminhoFinal), 90);

    imagedestroy($imageAniversario);
    imagedestroy($background);

    \Log::info('[SERVICE] caminhoFinal:' .$caminhoFinal);
    return $caminhoFinal;
}
}
