<p align="center">Este projeto foi constuido em <a href="https://sqlite.org/">🔗 SQLite</a> | <a href="https://docs.microsoft.com/pt-br/aspnet/core/?view=aspnetcore-6.0">🔗 ASP.NET Core</a> | <a href="https://pt-br.reactjs.org/">🔗 Reactjs</a></p>

<h4 align="center"> 
	🚧  Pontos Turísticos do Brasil  🚧
</h4><br/>

### 🎲 Rodando ASP.NET Core (aplicação)

```bash
# Clone este repositório
$ git clone https://github.com/AlanChaves/PontosTuristicos.git

# Acesse a pasta do projeto no terminal/cmd
$ cd .\\PontosTuristicosBackend\\PontosTuristicosBackend\\

# Construir a aplicação e validar se existem erros
$ dotnet build

# Criar e atualizar o banco de dados
$ dotnet ef database update

# Execute a aplicação em modo de desenvolvimento em um novo terminal
$ dotnet watch run

# O servidor inciará na porta:7156 - acesse <https://localhost:7156>
```

### 🎲 Rodando Reactjs (aplicação)

```bash
# Clone este repositório
$ git clone https://github.com/AlanChaves/PontosTuristicos.git

# Acesse a pasta do projeto no terminal/cmd
$ cd .\\frontend\\

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento em um novo terminal
$ npm start

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>
```

<h4 align="center"> 
	🚧  Executar <a href="https://nodejs.org/pt-br/">🔗 Nodejs</a> em vez do ASP.NET Core  🚧
</h4><br/>

### 🎲 Rodando Nodejs (aplicação) - Plus

```bash
# Modificar o acesso a api no .\frontend\services.api.tsx
# baseUrl: "http://localhost:3001"

# Clone este repositório
$ git clone https://github.com/AlanChaves/PontosTuristicos.git

# Acesse a pasta do projeto no terminal/cmd
$ cd .\\backend\\

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento em um novo terminal
$ npm start

# O servidor inciará na porta:3001 - acesse <http://localhost:3001>
# Caso queira executar em outra porta copiar o .env_example e
# colocar o novo valor em PORT
```
