const Joi = require('joi');
const salesModel = require('../models/salesModel');

const salesSchema = Joi.object({
  productId: Joi.number().required().label('productId'),
  quantity: Joi.number().min(1).required().label('quantity'),
}).messages({
  'any.required': '{{#label}} is required',
  'number.min': '{{#label}} must be greater than or equal to 1',
  'number.empty': 'Product not found',
});

const create = async (salesArr) => {
  const salesArraySchema = Joi.array().items(salesSchema);
  const { error } = salesArraySchema.validate(salesArr);
  if (error) throw new { status: 400, message: error.message }();

  const newSalePromises = salesArr.map((e) => salesModel(e));
  const newSaleResolvePromise = await Promise.all(newSalePromises);
  const newSales = salesArr
    .map((e, i) => ({ id: newSaleResolvePromise[i], ...e }));
  return newSales.sort((a, b) => a.id - b.id);
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