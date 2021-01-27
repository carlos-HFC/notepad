# NOTEPAD

Esse projeto é uma forma de bloco de notas, com sistema login em JWT utilizando o <a href="https://nestjs.com">NestJS</a>, <a href="https://dev.mysql.com/doc/">MySQL</a> e <a href="https://sequelize.org/master/">Sequelize</a>.

O projeto é composto por uma API em que o usuário pode efetuar login, cadastrar-se, além de criar notas, editá-las e excluí-las. Há a possibilidade do usuário desativar a sua conta e reativá-la dentro de uma semana.

<br>

## Iniciando

Basta instalar o `NodeJS` e o `MySQL` em sua máquina e instalar as dependências e rodar o projeto via `npm` ou `yarn`:

```bash
# yarn
yarn install
yarn start

# npm
npm install 
npm run start
```

<br>

## Configuração de variáveis

No projeto, há o arquivo `.env.example`, demonstrando quais são as variáveis utilizadas. São referentes a conexão com o banco de dados e a chave e o tempo de expiração do token JWT.

```json
{
  "DB_DIALECT": "tipo do banco (mysql, postgres, sqlite)",
  "DB_PORT": "porta do banco (3306, 5432)",
  "DB_HOST": "endereço da aplicação (localhost, api...)",
  "DB_NAME": "nome do banco (notepad, todolist)",
  "DB_USER": "username do banco (root, admin)",
  "DB_PASS": "senha do banco (******)",
  "JWT_SECRET": "chave secreta JWT (testestestestestes)",
  "JWT_EXPIRES": "tempo que o token expira (7d, 2m...)"
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
- **POST** - `/notes` - Buscar uma nota pelo ID
  - **title:** *string*
  - **description:** *string*
- **PUT** - `/notes/:id` - Editar uma nota
- **DELETE** - `/notes/:id` - Deletar uma nota