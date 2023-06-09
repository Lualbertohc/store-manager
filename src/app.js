const express = require('express');
const { NewSaleVerification } = require('./middlewares/newSales.middlewares');
const { verifyProductsAtributtes } = require('./middlewares/sales.middlewares');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(express.json());

app.get('/products', productsController.getAll);

app.get('/products/search', productsController.getByName);

app.get('/products/:id', productsController.getById);

app.post('/products', productsController.create);

app.post('/sales', verifyProductsAtributtes, salesController.create);

app.get('/sales', salesController.getAll);

app.get('/sales/:id', salesController.getById);

app.put('/products/:id', NewSaleVerification, productsController.update);

app.delete('/products/:id', productsController.del);

app.delete('/sales/:id', salesController.del);

app.put('/sales/:id', verifyProductsAtributtes, salesController.update);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;