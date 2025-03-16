const productRepository = require('../repositories/productRepository');

class ProductQueryHandler {
  async getAllProducts() {
    return productRepository.getAll();
  }

  async getByIds(ids, session) {
    return Promise.all(ids.map((id) => productRepository.getById(id, session)));
  }

  async get(id, session) {
    return productRepository.getById(id, session);
  }
}

module.exports = new ProductQueryHandler();
