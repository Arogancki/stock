const Product = require('../models/product');
const CustomError = require('../errors/custom');

exports.getAll = async () => Product.find();

exports.getById = async (id, session) => {
  const product = await Product.findById(id).session(session);
  if (!product) {
    throw new CustomError(`Not found ${id}`, 404);
  }

  return product;
};

exports.create = async (product) => {
  return product.save();
};

exports.changeStock = async ({ id, quantity }, { session }) => {
  if (quantity === 0) {
    return;
  }

  const query =
    quantity < 0 ? { _id: id, stock: { $gte: -quantity } } : { _id: id };

  return Product.findOneAndUpdate(
    query,
    { $inc: { stock: quantity } },
    { session }
  );
};
