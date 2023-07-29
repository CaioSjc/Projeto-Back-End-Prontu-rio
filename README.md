# Projeto-Back-End-Prontuario

##Descrição

Este repositório foi feito como projeto final do módulo 3 da Arnia, escola de progamação da qual faço parte, com intuito de eu adquirir mais experiência na área, e como um 
desafio sobre os conteúdos dos quais foram lecionados em sala de aula.
A presente aplicação possui foco no registros de pacientes, feitos por um psicólogo também registrado, cada psicólogo pode conter any pacientes, cada paciente poder conter any
timelines, cada timeline pode conter any ocorrências.
Além disso a aplicação toda arquitetada por camadas, possui diversas rotas com funcionalidades, um pouco de paginação, autorização, autenticação de rotas privadas, e testes  
unitários com Jest.

##Tecnologias

- NodeJs
- Express
- TypeScript
- MongoDB
- Jest
- Yup
- Bcrypt
- JsonWebToken

##Estrutura do Projeto

Diagrama de entidade e relacionamento:
![Captura de tela 2023-07-29 192512](https://github.com/CaioSjc/Projeto-Back-End-Prontuario/assets/115433314/8144348f-fe75-4623-9475-683f1a3ec8a0)

##Instalação

Crie seu próprio .env !!!

```bash
cp .env.example .env
```

Defina seus valores !!!

Instale as dependências do projeto !!!

```bash
yarn ou npm install
```

##Rodando o projeto

```bash
npm run dev
```

##Rodando os testes

```bash
npm run test '+nome do arquivo rodado entre aspas'
```

##URL do Deploy

Para o deploy foi utilizado a platafroma [railway](https://railway.app/).

[URL BASE]().
