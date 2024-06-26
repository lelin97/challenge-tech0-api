Este repositório contém o backend de um sistema de CRUD (Criar, Ler, Atualizar e Excluir) de boletos. 

Funcionalidades:
Gerenciamento de boletos:
Criar novos boletos.
Ler todos os boletos ou boletos específicos.
Atualizar as informações de um boleto.
Excluir um boleto.

Tecnologias utilizadas:
Node.js
Express
Typeorm
PostgresSQL
Zod

Como usar:

Clone este repositório para o seu computador.
Execute o comando no terminal `yarn`

Tenha o Docker instalado em sua máquina

Execute o comando no CMD `docker run --name ct-db -p 5432:5432 -e POSTGRES_USER=user-ct -e POSTGRES_PASSWORD=12345678 -e POSTGRES_DB=ctech-db -d postgres`

Crie um arquivo `.env`

Coloque esses comandos no arquivo `.env`

`DB_HOST=localhost`

`DB_PORT=5432`

`DB_USER=user-ct`

`DB_PASSWORD=12345678`

`DB_NAME=ctech-db`

Execute o comando `yarn start`

Caso deseje popular as tabelas do Banco

Execute o comando `yarn migration:run`

Execute o comando `yarn start`
