const salesService = require('../services/salesService');

const create = async (_req, res) => {
  try {
    const sales = await salesService.create();
    return res.status(201).json(sales);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

// const getAll = async (_req, res) => {
//   const sales = await salesService.getAll();
//   return res.status(200).json(sales);
// };

// const getById = async (req, res) => {
//   const { id } = req.params;
//   const sales = await salesService.getById(id);
//   return res.status(200).json(sales);
// };

module.exports = {
  create,
  // getAll,
  // getById,
};