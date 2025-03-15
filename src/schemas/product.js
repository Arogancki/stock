const Joi = require('joi');

const createSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(3).max(50).required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
});

const restockSchema = Joi.object({
  id: Joi.string().required(),
  quantity: Joi.number().required(),
});

module.exports = {
  createSchema,
  restockSchema,
};
