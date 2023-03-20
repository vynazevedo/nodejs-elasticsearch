const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("@elastic/elasticsearch");
const base64url = require("base64url");

const app = express();
const port = 3000;
const client = new Client({ node: "http://localhost:9200" });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/produtos", (req, res) => {
  let filtros = {};
  console.log(filtros);

  if (req.query.filtros) {
    try {
      const base64 = req.query.filtros;
      const json = base64url.decode(base64);
      console.log(json);
      filtros = JSON.parse(json);
    } catch (err) {
      console.error(err);
      return res.status(400).send("Os filtros de busca são inválidos.");
    }
  }

  let query = {
    match_all: {},
  };

  if (filtros.nome) {
    query = {
      match: {
        nome: {
          query: filtros.nome,
          fuzziness: "AUTO",
          boost: 2,
        },
      },
    };
  }

  if (filtros.preco_min && filtros.preco_max) {
    const precoMin = Number(filtros.preco_min);
    const precoMax = Number(filtros.preco_max);

    if (precoMin > precoMax) {
      return res.status(400).send("O filtro preco_min deve ser menor ou igual ao filtro preco_max.");
    }

    query = {
      range: {
        preco: {
          gte: precoMin,
          lte: precoMax,
        },
      },
    };
  }

  client.search(
    {
      index: "produtos",
      body: {
        query,
      },
    },
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Ocorreu um erro ao buscar os produtos.");
      }

      const hits = result.body.hits.hits.map((hit) => hit._source);

      res.json(hits);
    }
  );
});

app.post("/produto", (req, res) => {
  const { nome, descricao, preco } = req.body;

  if (!nome || !descricao || !preco) {
    return res.status(400).send("Por favor, preencha todos os campos.");
  }

  client.index(
    {
      index: "produtos",
      body: {
        nome,
        descricao,
        preco,
      },
    },
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Ocorreu um erro ao inserir o produto.");
      }

      res.send(`Produto "${nome}" inserido com sucesso.`);
    }
  );
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}.`);
});
