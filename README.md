# Blu Connect
#### 📋Pré-requisitos
Antes de começar, certifique-se de ter instalado os seguintes softwares em sua máquina:

**Node.js** (versão 18 ou superior)

**npm** (geralmente vem com o Node.js)

**Git** (para clonar o repositório)

### 1️⃣ Clone o repositório
Clone o repositório do projeto para o seu ambiente local:

```sh
git clone https://github.com/seu-usuario/blu-connect.git
```
### 2️⃣: Configurar o Backend
2.1 Instalar dependências
Navegue até a pasta do backend e instale as dependências:

```sh
cd back
npm install
```

##### 2.2 Configurar variáveis de ambiente
Crie um arquivo .env na raiz do backend (back) e preencha com as variáveis de ambiente necessárias. Use o arquivo env.exemple como referência:

```sh
BACKEND_PORT=4000
BACKEND_DATABASE_TZ=UTC
BACKEND_DATABASE_DIALECT=postgres
BACKEND_DATABASE=seu_banco_de_dados
BACKEND_DATABASE_USER=seu_usuario
BACKEND_DATABASE_HOST=localhost
BACKEND_DATABASE_PASSWORD=sua_senha
BACKEND_DATABASE_PORT=5432
DATABASE_URL=postgresql://seu_usuario:sua_senha@localhost:5432/seu_banco_de_dados
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=senha_admin
ADMIN_NAME=Admin

AWS_REGION=sua_regiao
AWS_ACCESS_KEY_ID=sua_chave_acesso
AWS_SECRET_ACCESS_KEY=sua_chave_secreta
EMAIL_USER=seu_email
JWT_SECRET=sua_chave_secreta_jwt
```

##### 2.3 Configurar o banco de dados

###### 2.3.1 Instalar PostgreSQL Localmente
Primeiro, se ainda não tiver o PostgreSQL instalado, você pode fazer o download e a instalação do PostgreSQL para o seu sistema operacional a partir do site oficial: PostgreSQL Downloads.

###### 2.3.2 Criar o Banco de Dados
Após a instalação do PostgreSQL, crie um novo banco de dados para a aplicação.

###### 2.3.3 Adicionar as variaveis do seu banco no .env
###### 2.3.4 Depois, execute as migrações do Prisma para criar as tabelas no banco de dados:

```
npx prisma migrate dev --name init
```

### 2.4 Rodar o backend
Inicie o servidor backend:

```
npm run dev
```
O backend estará rodando em http://localhost:4000.


## 3️⃣ Configurar o Frontend
### 3.1 Instalar dependências
Navegue até a pasta do frontend e instale as dependências:

```
cd ../front
npm install
```
### 3.2 Configurar variáveis de ambiente
Crie um arquivo .env na raiz do frontend (front) e defina a URL do backend:

```
REACT_APP_BLUCONNECT_BASE_URL=http://localhost:4000
```

### 3.3 Rodar o frontend
Inicie o servidor de desenvolvimento do frontend:

```
npm run dev
```
**O frontend estará rodando em http://localhost:3000.**

## 4️⃣ Acessar a aplicação
Agora que tanto o backend quanto o frontend estão rodando, você pode acessar a aplicação no navegador:

**Frontend: http://localhost:3000** 
**Backend: http://localhost:4000** 

## 5️⃣Build e deploy (opcional)
### 5.1 Build do frontend
Para gerar uma versão de produção do frontend, execute:


```
cd front
npm run build

```

Depois, inicie o servidor em modo produção:

```
cd back
npm run start
```
## 3.2 Build do backend
Para gerar uma versão de produção do backend, execute:


```
npm run build
```

Depois, inicie o servidor em modo produção:

```
npm run start
```

### ⁉️Problemas comuns
######  Erros de conexão com o banco de dados: Verifique se o PostgreSQL está rodando e se as credenciais no .env estão corretas.

###### Erros de dependências: Execute npm install novamente em ambas as pastas (blu-connect-back e blu-connect-front).