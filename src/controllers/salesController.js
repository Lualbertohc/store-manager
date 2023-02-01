const salesService = require('../services/salesService');

const create = async (req, res) => {
  const newSale = req.body;
  const { status, message } = await salesService.create(newSale);

  if (status) {
    return res.status(status).json({ message });
  }

  return res.status(201).json(message);
};

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sales = await salesService.getById(id);

  if (sales.message) return res.status(404).send(sales); 

  return res.status(200).json(sales);
};

const del = async (req, res) => {
  const { id } = req.params;
  const deletedSale = await salesService.del(id);

  if (deletedSale.message) {
    return res.status(404).json(deletedSale);
  }

  return res.status(204).json();
};

module.exports = {
  create,
  getAll,
  getById,
  del,
};