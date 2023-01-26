const express = require('express');

const productsController = require('./controllers/productsController');

const app = express();
app.use(express.json());

// fazer endpoint aqui
app.get('/products', productsController.getAll);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;