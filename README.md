# TESTE NODEJS ABARÉ

## ENDPOINTS

### Autenticação

-   POST /session

### Usuários

-   GET /user
-   GET /user/:id
-   POST /user
-   DELETE /user/:id

### Carteiras

-   GET /wallet
-   GET /wallet/:id

### Transações

-   GET /transaction
-   GET /transaction/:id
-   POST /transaction

## :wrench: Tecnologias utilizadas

-   Express
-   TypeScript
-   MySQL
-   Prisma
-   JWT
-   Bcryptjs

## :rocket: Rodando o projeto

-   Crie um usuário passando nome, email e senha no corpo da requisição em formato JSON para POST /user

[image.png](https://ibb.co/nrvQHqK)

-   Envie no corpo da requisiçao seu email e senha cadastrados em formato JSON para POST /session

[image.png](https://ibb.co/0GrytR4)

-   Agora que você tem seu Token, basta inseri-lo no bearer em suas próximas requisições

[image.png](https://ibb.co/V2rxCxg)
