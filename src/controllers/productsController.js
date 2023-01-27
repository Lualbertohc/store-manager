const productsService = require('../services/ProductsService');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);

  if (product.message) {
    return res.status(404).json(product);
  }
  return res.status(200).json(product);
};

module.exports = {
  getAll,
  getById,
};