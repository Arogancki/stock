const orderService = require('../services/orderService');
const orderSchema = require('../schemas/order');

exports.createOrder = async (req, res, next) => {
  try {
    const { error } = orderSchema.createOrder.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const price = await orderService.createOrder(
      req.body.customerId,
      req.body.products
    );
    res.status(201).json({ status: 'ok', price });
  } catch (error) {
    next(error);
  }
};
