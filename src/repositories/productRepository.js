const Product = require('../models/product');
const CustomError = require('../errors/custom');

exports.getAll = async () => Product.find();
exports.getById = async (id) => Product.findById(id);

exports.create = async (product) => {
  return product.save();
};

exports.changeStock = async ({ id, quantity }, { session }) => {
  if (quantity > 0) {
    const didUpdate = await Product.findByIdAndUpdate(
      id,
      { $inc: { stock: quantity } },
      { session }
    );

    if (!didUpdate) {
      throw new CustomError(`Not found ${id}`, 404);
    }
    return;
  }

  const didUpdate = await Product.findOneAndUpdate(
    { _id: id, stock: { $gte: -quantity } },
    { $inc: { stock: quantity } },
    { session }
  );
  if (didUpdate) {
    return;
  }

  if (await Product.findById(id).session(session)) {
    throw new CustomError(`Not enough in stock ${id}`, 400);
  }

  throw new CustomError(`Not found ${id}`, 404);
};
