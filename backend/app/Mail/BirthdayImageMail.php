<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Attachment;
use App\Models\User;

class BirthdayImageMail extends Mailable
{
    public $user;
    public $imagePath;

    public function __construct($imagePath, User $user)
    {
        $this->user = $user;
        $this->imagePath = $imagePath;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Feliz nosso dia!',
        );
    }

    public function content(): Content
    {
        return new Content(
            text: 'emails.birthday-text' // obrigatório retornar uma view
        );
    }

    public function attachments(): array
    {
        return [
            Attachment::fromPath(public_path($this->imagePath)) //já vem public/comemorativos/nome_do_arquivo
                ->as("{$this->user->nameCasal}_aniversario.png")
                ->withMime('image/png')
        ];
    }
}
