<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo"/>
  </a>
  <a href="https://react.dev/" target="_blank">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="React" width="120" height="120"/>
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeScript" width="120" height="120"/>
  </a>
  <a href="https://nodejs.org/" target="_blank">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" alt="Node.js" width="120" height="120"/>
  </a>
  <a href="https://www.prisma.io/" target="_blank">
    <img src="https://avatars.githubusercontent.com/u/17219288?s=200&v=4" alt="Prisma" width="120" height="120"/>
  </a>
</p>

## Tecnologias Utilizadas

[NestJs](https://github.com/nestjs/nest) foi framework de typescript usado para projetar o BackEnd


[React](https://github.com/facebook/react) foi a biblioteca de typescript usado para projetar o FrontEnd

## Banco de Dados e ORM

O projeto utiliza **NeonDB** como banco de dados PostgreSQL em nuvem e **Prisma ORM** para a comunicação com o banco de dados.

 **Prisma**: Usado como ORM para interagir com o banco de dados.
 
 **NeonDB**: Serviço de banco de dados PostgreSQL na nuvem, usado para armazenar os dados da aplicação.
## SetUp do projeto

```bash
$ git clone https://github.com/Allanvvaz/Expense-Control.git

$ npm install

$ npx prisma generate

#Para instalar as dependencias do frontend
$ cd frontend

$ npm install

#Para voltar ao diretório principal
$cd ..
```


## Passos para rodar o projeto

```bash
#No diretório principal use o comando para rodar o backend
$ npm run start

#Para entrar na pasta do frontend
$ cd frontend

#No diretório do frontend use o comando para rodar a página
$ npm run dev
```

## Problemas que podem acontecer

A connection string responsável pelo banco de dados pode não funcionar, para isso é necessário criar um banco de dados de uma database.
No schema.prisma cole a connection string da database onde se encontra url, depois digite:

```bash
#Isso garante que os tipos do prisma sejam regenerados de acordo com o banco de dados
$ npx prisma generate

# Para aplicar as migrações
$ npx prisma migrate
```
## OBS
A url da DataBase atual é de um banco de dados do Neon criado por mim





