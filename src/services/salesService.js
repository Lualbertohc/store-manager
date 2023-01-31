const Joi = require('joi');
const salesModel = require('../models/salesModel');
// const getAllProducts = require('./ProductsService');

const schema = Joi.object({
  quantity: Joi.number().min(1).required()
    .label('quantity'),
}).messages({
  'number.min': '{{#label}} must be greater than or equal to 1',
});

const create = async (salesArr) => {
  const arrSchema = Joi.array().items(schema);
  const { error } = arrSchema.validate(salesArr);

  if (error) return { status: 422, message: error.message };

  // getAllProducts.getAll();

  const productSale = await salesModel.createProductSale(salesArr);
  return { status: null, message: productSale };
};

// const getAll = async () => {
//   const sales = await salesModel.getAll();
//   return sales;
// };

// const getById = async (id) => {
//   const sales = await salesModel.getById(id);
//   return sales;
// };

module.exports = {
  create,
  // getAll,
  // getById,
};