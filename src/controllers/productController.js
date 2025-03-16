const productService = require('../services/productService');
const productSchema = require('../schemas/product');

exports.getAllProducts = async (req, res, next) => {
  try {
    res.json(await productService.getProducts());
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { error } = productSchema.createSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    res.status(201).json(await productService.createProduct(req.body));
  } catch (error) {
    next(error);
  }
};

exports.restockProduct = async (req, res, next) => {
  try {
    const payload = {
      id: req.params.id,
      quantity: req.body.quantity,
    };
    const { error } = productSchema.restockSchema.validate(payload);
    if (error) return res.status(400).json({ error: error.details[0].message });
    await productService.changeStock([payload.id], payload.quantity);
    res.json({ status: 'ok' });
  } catch (error) {
    next(error);
  }
};

exports.sellProduct = async (req, res, next) => {
  try {
    const payload = {
      id: req.params.id,
      quantity: req.body.quantity,
    };
    const { error } = productSchema.restockSchema.validate(payload);
    if (error) return res.status(400).json({ error: error.details[0].message });
    await productService.changeStock([payload.id], -payload.quantity);
    res.json({ status: 'ok' });
  } catch (error) {
    next(error);
  }
};
