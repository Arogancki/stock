const Joi = require('joi');

const createOrder = Joi.object({
  customerId: Joi.number().required().positive(),
  products: Joi.array().items(Joi.string().min(3).max(50)).min(1),
});

module.exports = {
  createOrder,
};
