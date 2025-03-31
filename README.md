# Seletivo Seplag-MT Genexus

## PROJETO PRÁTICO IMPLEMENTAÇÃO BACK-END GENEXUS

<p align="justify">
Este projeto consiste na implementação de uma API REST para gerenciamento de servidores (efetivos e temporários), unidades e lotações, conforme diagrama de banco de dados fornecido. A solução utiliza containers Docker para PostgreSQL e MinIO, com orquestração via Docker Compose.
</p>



### Tecnologias Utilizadas

Genexus 18 UP 8o
Java jdk-17.0.12
Banco de Dados: PostgreSQL (container)
Armazenamento de Objetos: MinIO (container)
Orquestração: Docker Compose
Autenticação: JWT (JSON Web Tokens)
API: RESTful com paginação

### Arquivos utilizado no projeto

Codigo Fonte: [Knowledge Base(KB)](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/KB_ProjetoGenexus.rar)

War: [seletivojava.war](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/seletivojava.war) 

docker-compose: [docker-compose.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/docker-compose.yaml) 

Script Sql: [script_create_tables.sql](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/script_create_tables.sql) 
 
Arquivos de configuração yaml para testes dos api:


[api.autenticar.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/blob/main/doc/api.autenticar.yaml) 

[api.cidade.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/blob/main/doc/api.cidade.yaml) 

[api.efetivoslotados.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/blob/main/doc/api.efetivoslotados.yaml)  

[api.enderecofuncional.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/blob/main/doc/api.enderecofuncional.yaml) 

[api.fotopessoa.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/blob/main/doc/api.fotopessoa.yaml) 

[api.lotacao.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/blob/main/doc/api.lotacao.yaml) 

[api.pessoa.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/blob/main/doc/api.pessoa.yaml) 

[api.servefetivo.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/blob/main/doc/api.servefetivo.yaml) 

[api.servidortemporario.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/blob/main/doc/api.servidortemporario.yaml) 

[api.unidade.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/blob/main/doc/api.unidade.yaml) 



### Configuração do Ambiente

[docker-compose](https://github.com/joaosalesjr/SeletivoSeplagGenexus/blob/main/docker/docker-compose.yaml) para subir as imagens

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

SCRIP SQL para criar as tabelad [script_create_tables.sql](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/sql/script_create_tables.sql) .


### Endpoints da API

#### Autenticação

POST  autenticar {{baseUrl}}/login - Autenticação com JWT (expira em 5 minutos) [api.autenticar.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/doc/api.autenticar.yaml) .

### CRUDs
GET|POST|PUT|DELETE /servefetivo - CRUD de servidores efetivos [api.servefetivo.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/doc/api.servefetivo.yaml) .

GET|POST|PUT|DELETE /servidoretemporario - CRUD de servidores temporários [api.servidortemporario.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/api.servidortemporario.yaml) .

GET|POST|PUT|DELETE /unidade - CRUD de unidades  [api.unidade.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/api.unidade.yaml) .

GET|POST|PUT|DELETE /lotacao - CRUD de lotações
[api.lotacao.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/api.lotacao.yaml) .

GET|POST|PUT|DELETE /cidade - CRUD de cidades [api.cidade.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/api.cidade.yaml) .

### Endpoints Específicos
GET /efetivoslotados?UnitId=<long>&Pagina=<integer>&Pagesize=<integer> - Lista servidores efetivos lotados em uma unidade (com nome, idade, unidade e link temporário para foto) [api.efetivoslotados.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/api.efetivoslotados.yaml) .

GET /enderecofuncional?nome={nome}<string>&Pagina=<integer>&Pagesize=<integer> - Consulta endereço funcional por parte do nome do servidor [api.enderecofuncional.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/api.enderecofuncional.yaml) .

POST /fotopessoa {{baseUrl}}/gxobject -  Realiza o Upload da foto da pessoa e link temporário [api.fotopessoa.yaml](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/api.fotopessoa.yaml) .


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

1. Deploy do war no tomcat ou similar `seletivojava.war`
2. Inicie os containers: `docker-compose up -d`
3. Execute a aplicação
4. Acesse a API em `http://localhost:8080/seletivojava/`

## Exemplos de Uso

### Autenticação

1. Executar o api de autenticação pra gera o token valido por 5 minutos, usuario e senha pre determinado: 

### api: autenticar 

    http://localhost:8080/seletivojava/api/autenticar
 
    {{baseUrl}}/login

```json
    {
    "Login": "admin",
    "Password": "admin"
    }
```

Apos autentica utilizar o token gerado no Auth dos Api's para ter autorização de uso.


### Listar servidores em uma unidade

    http://localhost:8080/seletivojava/api/efetivoslotados

```url  
  {{baseUrl}}/?UnitId=<long>&Pagina=<integer>&Pagesize=<integer>
```

### Listar o endereço funcional

    http://localhost:8080/seletivojava/api/enderecofuncional

```url  
  {{baseUrl}}/?Nome=<string>&Pagina=<integer>&Pagesize=<integer>
```


### Upload de foto

API fotopessoa

1 Upload a binary for fotopessoa

```url
    POST http://localhost:8080/seletivojava/api/fotopessoa
```
Fazer o upload da foto com:
```url
    {{baseUrl}}/gxobject
```
Obtendo o:
```json
    {
        "object_id": "gxupload:5cd27323e7ea4ca3b8912b1cca3ac020"
    }
```

2 Método fazer upload da foto da pessoa.



## Considerações Finais

Esta implementação atende todos os requisitos solicitados, incluindo:
- Autenticação JWT com expiração e renovação
- CRUDs completos para todas as entidades principais
- Paginação em todas as consultas
- Upload e recuperação segura de fotos via MinIO
- Consultas específicas conforme solicitado
- Orquestração via Docker Compose

O código está organizado seguindo boas práticas de desenvolvimento e pode ser facilmente extendido para incluir novas funcionalidades.
