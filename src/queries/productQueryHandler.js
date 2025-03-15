const CustomError = require('../errors/custom');
const productRepository = require('../repositories/productRepository');

class ProductQueryHandler {
  async getAllProducts() {
    return productRepository.getAll();
  }

  async getByIds(ids) {
    const products = await Promise.all(
      ids.map((id) => productRepository.getById(id))
    );
    const productIndex = products.findIndex((p) => !p);

    if (productIndex !== -1) {
      throw new CustomError(`Not found ${products[productIndex]}`, 404);
    }

    return products;
  }
}

module.exports = new ProductQueryHandler();
