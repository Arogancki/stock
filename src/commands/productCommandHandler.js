const Product = require('../models/product');
const productRepository = require('../repositories/productRepository');

class ProductCommandHandler {
  async createProduct({ name, description, price, stock }) {
    const product = new Product({ name, description, price, stock });
    const savedProduct = await productRepository.create(product);
    const result = {
      id: String(savedProduct._id),
      name,
      description,
      price,
      stock,
    };

    return result;
  }

  async changeStock({ id, quantity, session }) {
    return productRepository.changeStock({ id, quantity }, { session });
  }
}

module.exports = new ProductCommandHandler();
