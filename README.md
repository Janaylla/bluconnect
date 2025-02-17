# Blu Connect

Este é o projeto Blu Connect, uma aplicação com frontend em React e backend em NestJS.

## Requisitos

Antes de rodar a aplicação, você precisa ter instalado:

- **Node.js** (recomendo a versão 16 ou superior)
- **npm** (gerenciador de pacotes do Node.js)
- **Docker** (caso deseje usar o Docker para o banco de dados)

## Rodando a aplicação localmente

### 1. Configuração do Frontend

#### Passo 1: Instalar dependências

1. Navegue até a pasta do frontend (`blu-connect-front`):
   ```bash
   cd front
Instale as dependências:
bash
Copiar
Editar
npm install
Passo 2: Configurar variáveis de ambiente
Na raiz do projeto frontend, crie um arquivo .env e adicione a seguinte variável:
bash
Copiar
Editar
REACT_APP_BLUCONNECT_BASE_URL=http://localhost:4000
Passo 3: Iniciar o servidor de desenvolvimento
Execute o comando abaixo para iniciar o frontend:

bash
Copiar
Editar
npm run dev
O frontend estará disponível em http://localhost:3000.

2. Configuração do Backend
Passo 1: Instalar dependências
Navegue até a pasta do backend (blu-connect-back):

bash
Copiar
Editar
cd back
Instale as dependências:

bash
Copiar
Editar
npm install
Passo 2: Configurar variáveis de ambiente
Na raiz do projeto backend, crie um arquivo .env e adicione as seguintes variáveis (consulte as configurações corretas para seu banco de dados e outras credenciais):
bash
Copiar
Editar
BACKEND_PORT=4000
BACKEND_DATABASE_TZ=UTC
BACKEND_DATABASE_DIALECT=postgres
BACKEND_DATABASE=
BACKEND_DATABASE_USER=
BACKEND_DATABASE_HOST=
BACKEND_DATABASE_PASSWORD=
BACKEND_DATABASE_PORT=5432
DATABASE_URL=
ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_NAME=

AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
EMAIL_USER=
JWT_SECRET=
Passo 3: Rodar o servidor backend
Execute o comando abaixo para rodar o backend:

bash
Copiar
Editar
npm run dev
O backend estará disponível em http://localhost:4000.

3. Configuração do Banco de Dados
Você pode usar o PostgreSQL localmente, ou configurar um container Docker para o banco de dados.

Usando Docker
Se você quiser rodar o banco de dados PostgreSQL usando o Docker, execute o comando abaixo:

bash
Copiar
Editar
docker run --name postgres -e POSTGRES_USER=youruser -e POSTGRES_PASSWORD=yourpassword -e POSTGRES_DB=yourdb -p 5432:5432 -d postgres
O banco de dados estará disponível na porta 5432.

Passo 1: Configurar o Prisma
Após configurar as variáveis de ambiente no backend, rode as migrações do Prisma para criar as tabelas no banco de dados:
bash
Copiar
Editar
npx prisma migrate dev
4. Testar a aplicação
Com o frontend rodando em http://localhost:3000 e o backend rodando em http://localhost:4000, você pode acessar a aplicação no seu navegador.

O frontend irá se comunicar com a API do backend, que estará acessível pela URL configurada (REACT_APP_BLUCONNECT_BASE_URL=http://localhost:4000).

Scripts disponíveis
No frontend:
npm run dev: Inicia o servidor de desenvolvimento do React.
npm run build: Cria uma build otimizada do frontend.
npm run test: Executa os testes do frontend.
No backend:
npm run dev: Inicia o servidor de desenvolvimento do NestJS.
npm run build: Compila o backend para produção.
npm run test: Executa os testes do backend.
Contribuindo
Se você deseja contribuir para o projeto, siga as etapas abaixo:

Fork o repositório.
Crie uma nova branch para a sua feature (git checkout -b feature/nova-feature).
Faça as alterações desejadas e envie para o repositório (git push origin feature/nova-feature).
Abra um pull request com uma descrição clara do que foi feito.
Licença
Este projeto é de código aberto e está licenciado sob a Licença MIT.

markdown
Copiar
Editar

### Explicação:

- **Configuração do Frontend e Backend**: Explica como configurar o ambiente de desenvolvimento para ambas as partes.
- **Banco de Dados**: Inclui instruções para usar Docker para rodar o PostgreSQL.
- **Scripts e Comandos**: Detalha como rodar o projeto e os principais scripts disponíveis.
- **Contribuição**: Dá orientações caso alguém queira colaborar no projeto.
