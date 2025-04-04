# Seletivo Seplag-MT Genexus

## Inscrição do candidato:

- **Processo Seletivo**: PSS 02/2025/SEPLAG (Analista de TI - Perfil Sênior)
- **Inscrição**: 8692
- **Nome**: JOAO PEREIRA SALES JUNIOR
- **Perfil**: Desenvolvedor Genexus - Sênior


## PROJETO PRÁTICO IMPLEMENTAÇÃO BACK-END GENEXUS


---


Este projeto consiste na implementação de uma API REST para gerenciamento de servidores (efetivos e temporários), unidades e lotações, conforme diagrama de banco de dados fornecido. A solução utiliza containers Docker para **PostgreSQL** e **MinIO**, com orquestração via **Docker Compose**, aplicação desenvolvida com **Genexus 18 U8**, utilizando utilizando **Java 17**.


---

### Tecnologias Utilizadas

 - **Genexus 18 UP8** com Java **JDK 17.0.12** 
 - **Banco de Dados: PostgreSQL 17** (container) 
 - **Armazenamento de Objetos: MinIO** (container) 
 - **Servidor de Aplicação: Tomcat 11** (container) 
 - **Orquestração: Docker Compose** 
 - **Autenticação: JWT** (JSON Web Tokens) 

---

### Arquivos do projeto
Codigo Fonte no diretorio `KB`: [Knowledge Base(KB)](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/kb/KB_ProjetoGenexus.rar)

A aplicação no diretorio `War`: [seletivojava.war](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/war/seletivojava.war) 

Script Sql de criação da estrutura do banco de dados no diretorio `sql`: [script_create_tables.sql](https://github.com/joaosalesjr/SeletivoSeplagGenexus/edit/main/sql/script_create_tables.sql) 

---

### **Configuração do Ambiente**

1. Navegue até a pasta `docker` do projeto e obtenha o arquivo [`docker-compose`](https://github.com/joaosalesjr/SeletivoSeplagGenexus/blob/main/docker/docker-compose.yaml).

2. Execute o seguinte comando no terminal dentro dessa pasta:
    ```sh
    docker-compose up -d
    ```
  Esta ação iniciará os seguintes containers:
   - MinIO
   - PostgreSQL
   - Tomcat 11
   

O ambiente estará disponível nos seguintes endereços:

- **PostgreSQL**: `localhost:5432` (usuário: `postgres`, senha: `123456`)
- **MinIO Console**: `localhost:9001` (usuário: `minioadmin`, senha: `minioadmin`)
- **Tomcat 11**: `localhost:8080`

### **Endpoints da API**

Na aplicação teremos o swagger-ui que ustilizamos para teste dos api:

### **swagger-ui**
    
    http://localhost:8080/seletivojava/swagger-ui/

Este que foi configurado com os arquivos YAML que estão disponivel no diretório `doc` listado a baixo:

- `api.autenticar.yaml`
- `api.cidade.yaml`
- `api.efetivoslotados.yaml`
- `api.enderecofuncional.yaml`
- `api.fotopessoa.yaml`
- `api.lotacao.yaml`
- `api.pessoa.yaml`
- `api.servefetivo.yaml`
- `api.servidortemporario.yaml`
- `api.unidade.yaml`

Assim podemos executar o passo a passo abaixo para testar selecionando o api na combombox **Select a definition**.

### **Autenticação**

**Autenticar obter o Token** `POST /login` - Metodo gerar o token de Autenticação via JWT (expira em 5 minutos). [api.autenticar.yaml]

### **CRUDs**

- **Servidores Efetivos**: `GET|POST|PUT|DELETE /servefetivo` [api.servefetivo.yaml]
- **Servidores Temporários**: `GET|POST|PUT|DELETE /servidoretemporario` [api.servidortemporario.yaml]
- **Unidades**: `GET|POST|PUT|DELETE /unidade` [api.unidade.yaml]
- **Lotação**: `GET|POST|PUT|DELETE /lotacao` [api.lotacao.yaml]
- **Cidades**: `GET|POST|PUT|DELETE /cidade` [api.cidade.yaml]

### **Endpoints Específicos**

- **GET /efetivoslotados?UnitId=<long>&Pagina=<integer>&Pagesize=<integer>** - Lista servidores efetivos lotados em uma unidade (com nome, idade, unidade e link temporário para foto) [api.efetivoslotados.yaml]

- **GET /enderecofuncional?nome={nome}<string>&Pagina=<integer>&Pagesize=<integer>** - Consulta endereço funcional por parte do nome do servidor. [api.enderecofuncional.yaml]

- **POST /fotopessoa  /gxobject** -  Carregar uma foto em binário da fotopessoa. [api.fotopessoa.yaml]

- **GET|POST /fotopessoa  /** -  Grava e consulta a foto da pessoa. [api.fotopessoa.yaml]


### **Funcionalidades Implementadas**

1. **Autenticação e Autorização**:
   - JWT com expiração em 5 minutos
   - Possibilidade de refresh token 5 minutos

2. **CRUDs Completos**:
   - Todas as operações básicas para as entidades principais
   - Validação de dados e tratamento de erros

3. **Paginação**:
   - Todos os endpoints de listagem suportam paginação via query params (`?Pagina=1&Pagesize=10`)

4. **Upload de Fotos**:
   - Armazenamento no MinIO
   - Geração de links temporários com expiração
   - Metadados armazenados no PostgreSQL

5. **Consultas Específicas**:
   - Servidores por unidade com dados calculados (idade)
   - Endereço funcional por nome do servidor

---

# **Exemplos de Uso**

### Autenticação

1. Executar o api de autenticação pra gera o token valido por 5 minutos, usuario e senha pre determinado: 

### **api: autenticar**

    http://localhost:8080/seletivojava/api/autenticar
 
    {{baseUrl}}/login

```json
    {
    "Login": "admin",
    "Password": "admin"
    }
```

Apos autentica utilizar o token gerado no Auth/Bearer token dos Api's para ter autorização de uso.


### **Listar servidores em uma unidade**

    http://localhost:8080/seletivojava/api/efetivoslotados

```url  
  {{baseUrl}}/?UnitId=<long>&Pagina=<integer>&Pagesize=<integer>
```

### Listar o endereço funcional

    http://localhost:8080/seletivojava/api/enderecofuncional

```url  
  {{baseUrl}}/?Nome=<string>&Pagina=<integer>&Pagesize=<integer>
```
---

## Upload de foto

### **API fotopessoa**

1 Carregar um binário para fotopessoa

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

2 Para gravar os dados da foto da pessoa utilizar o pes_id existente.
```url
    {{baseUrl}}/
```
```json
{
  "sdt_foto_pessoa_insert": {
    "pes_id": 1,
    "fp_foto": "gxupload:5cd27323e7ea4ca3b8912b1cca3ac020"
  }
}
```


# Considerações Finais

Esta implementação atende todos os requisitos solicitados, incluindo:
- Autenticação JWT com expiração e renovação
- CRUDs completos para todas as entidades principais
- Paginação em todas as consultas
- Upload e recuperação segura de fotos via MinIO
- Consultas específicas conforme solicitado
- Orquestração via Docker Compose

O código está organizado seguindo boas práticas de desenvolvimento e pode ser facilmente extendido para incluir novas funcionalidades.


