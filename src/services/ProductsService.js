const productsModel = require('../models/productsModel');
const middleware = require('../middlewares/products.middlewares');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product || product.length === 0) {
    const message = { message: 'Product not found' };
    return message;
  }

  return product;
};

const create = async ({ name }) => {
  const message = middleware.verifyName(name);
  if (message !== 'ok') return message;
  
  const id = await productsModel.create({ name });
  return { id, name };
};

module.exports = {
  getAll,
  getById,
  create,
};
