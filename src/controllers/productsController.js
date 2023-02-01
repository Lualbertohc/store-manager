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

const create = async (req, res) => {
  const { name } = req.body;
  const newProduct = await productsService.create({ name });

  if (newProduct.message && newProduct.message.includes('required')) {
    return res.status(400).json(newProduct);
  }
  if (newProduct.message && newProduct.message.includes('length')) {
    return res.status(422).json(newProduct);
  }

  return res.status(201).json(newProduct);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const products = await productsService.update(id, name);

  if (products.message) {
    return res.status(404).send(products);
  }
  
  return res.status(200).json(products);
};

const del = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await productsService.del(id);

  if (deletedProduct.message) {
    return res.status(404).send(deletedProduct);
  }
    
  return res.status(204).json();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  del,
};