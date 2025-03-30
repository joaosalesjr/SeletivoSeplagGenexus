# SeletivoSeplagGenexus

<h1>PROJETO PRÁTICO IMPLEMENTAÇÃO BACK-END GENEXUS</h1> 

<p align="justify">
Este projeto consiste na implementação de uma API REST para gerenciamento de servidores (efetivos e temporários), unidades e lotações, conforme diagrama de banco de dados fornecido. A solução utiliza containers Docker para PostgreSQL e MinIO, com orquestração via Docker Compose.
</p>



### Tecnologias Utilizadas

Genexus 18 UP 8
Java jdk-17.0.12
Banco de Dados: PostgreSQL (container)
Armazenamento de Objetos: MinIO (container)
Orquestração: Docker Compose
Autenticação: JWT (JSON Web Tokens)
API: RESTful com paginação



### Configuração do Ambiente

[docker-compose](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/docker-compose.yaml) para subir as imagens.

Execute os containers:
```sh
docker-compose up -d
```
O ambiente estará disponível nos seguintes endereços:

PostgreSQL: localhost:5432  (usuário: postgres,  senha: 123456)

MinIO Console: localhost:9001 (usuário: minioadmin,  senha: minioadmin)



### Estrutura do Banco de Dados
O banco de dados contém as seguintes tabelas principais:

pessoa: Dados pessoais dos servidores

servidor_efetivo: Servidores com vínculo efetivo

servidor_temporario: Servidores com vínculo temporário

unidade: Unidades organizacionais

lotacao: Relacionamento entre servidores e unidades

foto_pessoa: Armazena metadados das fotos (arquivos no MinIO)

endereco e cidade: Dados de endereçamento


### Endpoints da API
Autenticação

autenticar POST {{baseUrl}}/login - Autenticação com JWT (expira em 5 minutos)

### CRUDs
GET|POST|PUT|DELETE /servefetivo - CRUD de servidores efetivos

[api.servefetivo.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/api.servefetivo.yaml) para teste.

GET|POST|PUT|DELETE /servidoretemporario - CRUD de servidores temporários

[api.servidortemporario.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/api.servidortemporario.yaml) para teste.

GET|POST|PUT|DELETE /unidade - CRUD de unidades

[api.unidade.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/api.unidade.yaml) para teste.

GET|POST|PUT|DELETE /lotacao - CRUD de lotações

[api.lotacao.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/api.lotacao.yaml) para teste.

GET|POST|PUT|DELETE /cidade - CRUD de lotações
[api.cidade.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/api.cidade.yaml) para teste.


### Endpoints Específicos
GET /efetivoslotados?UnitId=<long>&Pagina=<integer>&Pagesize=<integer> - Lista servidores efetivos lotados em uma unidade (com nome, idade, unidade e link temporário para foto)

[api.efetivoslotados.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/api.efetivoslotados.yaml) para teste.

GET /enderecofuncional?nome={parte_do_nome}<string>&Pagina=<integer>&Pagesize=<integer> - Consulta endereço funcional por parte do nome do servidor

[api.enderecofuncional.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/api.enderecofuncional.yaml) para teste.

### Funcionalidades Implementadas

1. **Autenticação e Autorização**:
   - JWT com expiração em 5 minutos
   - Possibilidade de refresh token
   - CORS restrito ao domínio da aplicação

2. **CRUDs Completos**:
   - Todas as operações básicas para as entidades principais
   - Validação de dados e tratamento de erros

3. **Paginação**:
   - Todos os endpoints de listagem suportam paginação via query params (`?page=1&limit=10`)

4. **Upload de Fotos**:
   - Armazenamento no MinIO
   - Geração de links temporários com expiração
   - Metadados armazenados no PostgreSQL

5. **Consultas Específicas**:
   - Servidores por unidade com dados calculados (idade)
   - Endereço funcional por nome do servidor

## Como Executar

1. Configure as variáveis de ambiente no arquivo `.env`
2. Inicie os containers: `docker-compose up -d`
3. Execute a aplicação: `npm start` (ou comando equivalente para outra linguagem)
4. Acesse a API em `http://localhost:[PORTA]`
# Exemplos de Uso

### Autenticação
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"senha"}'
```

### Listar servidores em uma unidade
```bash
curl -X GET http://localhost:3000/unidades/1/servidores \
  -H "Authorization: Bearer [TOKEN_JWT]"
```

### Upload de foto
```bash
curl -X POST http://localhost:3000/servidores/1/fotos \
  -H "Authorization: Bearer [TOKEN_JWT]" \
  -F "foto=@caminho/para/foto.jpg"
```

## Considerações Finais

Esta implementação atende todos os requisitos solicitados, incluindo:
- Autenticação JWT com expiração e renovação
- CRUDs completos para todas as entidades principais
- Paginação em todas as consultas
- Upload e recuperação segura de fotos via MinIO
- Consultas específicas conforme solicitado
- Orquestração via Docker Compose

O código está organizado seguindo boas práticas de desenvolvimento e pode ser facilmente extendido para incluir novas funcionalidades.
