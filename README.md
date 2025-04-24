# Projeto Lovelovepic ❤️📷

## Objetivo do projeto
 Criar um aplicativo mobile e desktop para que o usuário adicione fotos e informações sobre seu relacionamento, para que no dia do aniversário do casal, uma montagem com as fotos e mensagem enviadas seja gerada automaticamente e enviada no e-mail deste usuário.

## Como rodar o projeto em sua máquina:
Dê um git clone no projeto <br/>
OBS: Você deve ter instalado o [Docker Desktop](https://www.docker.com/products/docker-desktop/) em sua máquina.

## Comece configurando o backend
1. Entre no diretório /backend se você não tem o composer instalado siga as instruções, para instalar: [https://kinsta.com/pt/blog/instalar-composer/].

2. Instale as dependências: 
```
composer install
```
    

3. No terminal suba os containers: servidor, mySQL e do agendamento de mensagens: 
```
./vendor/bin/sail up 
```

4. Rode as migrations para criar a estrutura do banco: 
```
./vendor/bin/sail artisan migrate
```

5. Crie e configure o arquivo .env baseado .env.example <br/>
- Gere uma key para APP_KEY:  
```
./vendor/bin/sail artisan key:generate
```

- Configure o MAIL para envio de emails. Se tem dúvidas sobre o MAIL_PASSWORD= você deve gerar essa senha com sua conta Google, lembrando que sua conta precisa ter verificação em duas etapas. Sabendo disso, [gere aqui sua senha diretamente](https://myaccount.google.com/apppasswords) ou [siga um passo a passo completo](https://snov.io/knowledgebase/br/como-criar-e-usar-a-senha-do-aplicativo-gmail/).


6. Crie a pasta uploads e comemorativos em backend/public

7. O agendamento de horário para envio dos emails está em backend/routes/console.php altere o horário para um horário próximo para testar.


## Para o frontend 
1. Primeiro conecte ele com o backend 
- Instale localtunnel para expor sua porta
```
npm install -g localtunnel 
```
- Gere um "tunel" para seu servidor local 
```
lt --port 80 
```
- Crie um arquivo .env com a seguinte chave-valor: NEXT_PUBLIC_API_URL=[linkdotunel] <br/>
- Antes de usar o link de fato, consulte ele no navegador e siga a instrução de configuração da senha.

- Suba as alterações do seu repositório alterado pro github <br/>
- Na [https://vercel.com/](Vercel) adicione um novo projeto e selecione o root como /frontend para fazer o deploy. <br/>
- Ainda na vercel configure a variável de ambiente NEXT_PUBLIC_API_URL=[linkdotunel]

## Aplicativo
- Instale as dependências npm install <br>
- Rode o comando npx expo start <br>
- Altere na pasta constantes o httpRequest para o endereço gerado <br>
- Baixe no seu dispositivo o app Expo go <br>
- Leia o QR code gerado no terminal <br>

<br><br>

# Pronto!!

