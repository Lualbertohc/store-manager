const express = require('express');
const { verifyAtributtes } = require('./middlewares/sales.middlewares');

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(express.json());

// fazer endpoint aqui
app.get('/products', productsController.getAll);

app.get('/products/:id', productsController.getById);

app.post('/products', productsController.create);

app.post('/sales', verifyAtributtes, salesController.create);

// app.get('/sales', salesController.getAll);

// app.get('/sales/:id', salesController.getById);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;