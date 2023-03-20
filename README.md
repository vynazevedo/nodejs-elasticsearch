# nodejs-elasticsearch

Esta é uma API que permite buscar produtos em um índice Elasticsearch. A API foi criada com Node.js e Express, e usa a biblioteca elasticsearch para se comunicar com o Elasticsearch.

A API permite buscar produtos com base em critérios como nome, preço mínimo e preço máximo. Os critérios de busca são passados como parâmetros na URL da API.

## Instalação
Antes de usar a API, é necessário instalar as dependências do projeto. Para isso, execute o seguinte comando na raiz do projeto:

``
npm install
``
## Configuração
Antes de usar a API, é necessário configurar as credenciais de acesso ao Elasticsearch. Para isso, crie um arquivo .env na raiz do projeto com as seguintes variáveis:

``
ELASTICSEARCH_HOST=URL do host do Elasticsearch
``

``
ELASTICSEARCH_USER=Nome de usuário do Elasticsearch (opcional)
``

``
ELASTICSEARCH_PASSWORD=Senha do Elasticsearch (opcional)
``

Se o Elasticsearch não exigir autenticação, você pode deixar as variáveis ELASTICSEARCH_USER e ELASTICSEARCH_PASSWORD em branco.

## Uso
Para usar a API, execute o seguinte comando na raiz do projeto:

``
npm start
``

Isso iniciará a API na porta 3000. Você pode acessar a API através da seguinte URL:

``
http://localhost:3000/produtos
``

Para buscar produtos com base em critérios, adicione os parâmetros desejados na URL. Por exemplo, para buscar produtos com nome "notebook" e preço entre 1000 e 2000 reais, use a seguinte URL:

``
http://localhost:3000/produtos?nome=notebook&preco_min=1000&preco_max=2000
``