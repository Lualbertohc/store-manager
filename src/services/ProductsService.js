const productsModel = require('../models/productsModel');

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

module.exports = {
  getAll,
  getById,
};
