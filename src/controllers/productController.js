const productCommandHandler = require('../commands/productCommandHandler');
const productQueryHandler = require('../queries/productQueryHandler');
const productSchema = require('../schemas/product');

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await productQueryHandler.getAllProducts();
    res.json(products.map((product) => product.toJSON()));
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { error } = productSchema.createSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const product = await productCommandHandler.createProduct(req.body);
    res.status(201).json(product);
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
    await productCommandHandler.changeStock({
      id: payload.id,
      quantity: payload.quantity,
    });
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
    await productCommandHandler.changeStock({
      id: payload.id,
      quantity: -payload.quantity,
    });
    res.json({ status: 'ok' });
  } catch (error) {
    next(error);
  }
};
