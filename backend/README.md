# NOTEPAD

Esse projeto é uma forma de bloco de notas, com sistema login em JWT utilizando o <a href="https://nestjs.com">NestJS</a>, <a href="https://dev.mysql.com/doc/">MySQL</a> e <a href="https://sequelize.org/master/">Sequelize</a>.

O projeto é composto por uma API em que o usuário pode efetuar login, cadastrar-se, além de criar notas, editá-las e excluí-las. Há a possibilidade do usuário desativar a sua conta e reativá-la dentro de uma semana.

<br>

## Iniciando

Basta instalar o `NodeJS` e o `MySQL` em sua máquina, instalar as dependências e rodar o projeto via `npm` ou `yarn`:

```sh
# yarn
yarn install
yarn start

# npm
npm install 
npm run start
```

<br>

## Configuração de variáveis ambiente

No projeto, há o arquivo `.env.example`, demonstrando quais são as variáveis utilizadas. São referentes a conexão com o banco de dados, a chave JWT e o tempo de expiração do token.

<small>Abaixo um exemplo em JSON:</small>

```json
{
  "DB_DIALECT": "mysql, postgres, sqlite",
  "DB_PORT": "3306, 5432",
  "DB_HOST": "localhost, 127.0.0, api.domain.com",
  "DB_NAME": "notepad, mydb, dbtest",
  "DB_USER": "root, admin",
  "DB_PASS": "123456, *******",
  "JWT_SECRET": "698dc19d489c4e4db73e28a713eab07b",
  "JWT_EXPIRES": "7d, 1h, 36000ms"
}
```

<br>

## API

O servidor roda na porta `8000` e tem as seguintes rotas:

- **POST** - `/auth/login` - Login de usuário
  - **email:** *string*
  - **password:** *string*
- **POST** - `/auth/register` - Registrar um usuário
  - **name:** *string*
  - **email:** *string*
  - **password:** *string*
  - **confirmPass:** *string*
- **POST** - `/auth/reactive` - Reativar a conta de um usuário
  - **email:** *string*

<br>

- **GET** - `/users/profile` - Dados do usuário logado
- **PUT** - `/users` - Editar os dados do usuário logado
- **DELETE** - `/users` - Desativar conta do usuário logado

<br>

- **GET** - `/notes` - Buscar todas as notas
- **GET** - `/notes/:id` - Buscar uma nota pelo ID
- **POST** - `/notes` - Registrar uma nota
  - **title:** *string*
  - **description:** *string*
- **PUT** - `/notes/:id` - Editar uma nota
- **DELETE** - `/notes/:id` - Deletar uma nota