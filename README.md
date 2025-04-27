# Projeto Lovelovepic ❤️📷

## Objetivo do projeto
 Criar um aplicativo mobile e desktop para que o usuário adicione fotos e informações sobre seu relacionamento, para que no dia do aniversário do casal, uma montagem com as fotos e mensagem enviadas seja gerada automaticamente e enviada no e-mail deste usuário.

## Como rodar o projeto em sua máquina:
Crie uma pasta e abra com vsCode, no terminal clone o projeto:
```
git clone https://github.com/Isabelavitoria7/LovelovePic-Desafio.git .
```

OBS: Você deve ter instalado o [Docker Desktop](https://www.docker.com/products/docker-desktop/) em sua máquina para as próximas etapas.

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

4. Crie um arquivo .env na raiz do projeto e configure-o baseado no .env.example, atente-se em nas instruções abaixo para algumas mudanças nesse .env<br/>

Para garantir a conexão com o banco siga os passos: <br>
com o container mysql rodando, attach shell -> Entre no mysql (apenas digite mysql) <br>
crie um novo usuário com name user e host % com o comando abaixo, escolha a sua senha.

```
CREATE USER 'user'@'%' IDENTIFIED BY 'senha';

GRANT ALL PRIVILEGES ON * . * TO 'user'@'%'; 

FLUSH PRIVILEGES;
```

adicione a senha senha no .env na variável DBPASSWORD.

- Configure o MAIL para envio de emails. Se tem dúvidas sobre o MAIL_PASSWORD= você deve gerar essa senha com sua conta Google, lembrando que sua conta precisa ter verificação em duas etapas. Sabendo disso, [gere aqui sua senha diretamente](https://myaccount.google.com/apppasswords) ou [siga um passo a passo completo](https://snov.io/knowledgebase/br/como-criar-e-usar-a-senha-do-aplicativo-gmail/).

- Gere uma key para variável APP_KEY:  
```
./vendor/bin/sail artisan key:generate
```

Se der problema com a pasta /var/www/html de permissão para ela com chmod 755 -R /var/www/html e depois transfira os arquivos backend para lá docker cp /mnt/c/Users/Usuario/Documents/TesteLovePic/backend/. <idDocontainerDoBackend>lt --port 80:/var/www/html/

### Se conecte ao banco de dados

5. Garanta que a porta 3307 está disponível para não dar conflito de porta, ou altere para outra.

6. Rode as migrations para criar a estrutura do banco: 
```
./vendor/bin/sail artisan migrate
```

7. Crie a pasta uploads e comemorativos em backend/public

8. O agendamento de horário para envio dos emails está em backend/routes/console.php altere o horário para um horário próximo para testar.


## Para o frontend 
1. Primeiro conecte ele com o backend, no diretório frontend:

- Instale localtunnel para expor sua porta
```
npm install -g localtunnel 
```
- Gere um "tunel" para seu servidor local 
```
lt --port 80 
```
- Crie um arquivo .env e adicione seguinte chave-valor: NEXT_PUBLIC_API_URL=[linkdotunel] sem ""<br/>
- Antes de usar o link de fato, consulte ele no navegador e siga a instrução de configuração da senha.

- Suba seu projeto para um repositório remoto no github<br/>
- Na [Vercel](https://vercel.com/) adicione um novo projeto e selecione o root como /frontend para fazer o deploy. <br/>
- Ainda na vercel configure a variável de ambiente NEXT_PUBLIC_API_URL=[linkdotunel]

## Aplicativo
- No diretório Love-app:
- Instale as dependências
```
npm install
```
- Rode o comando para iniciar o app
```
npx expo start
```
- Altere na pasta constantes o httpRequest para o endereço gerado <br>
- Baixe no seu dispositivo o app Expo go <br>
- Leia o QR code gerado no terminal <br>

<br><br>

# Pronto!!



