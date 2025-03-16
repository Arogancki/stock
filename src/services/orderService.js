const { applyDiscount } = require('./discountService');
const { applyUserFees } = require('./userService');
const productService = require('./productService');

exports.createOrder = async (customerId, productIds) => {
  const products = await productService.getProducts(productIds);
  const totalPrice = products.reduce((acc, product) => acc + product.price, 0);
  const discountedPrice = applyDiscount(totalPrice, products);
  const priceWithFees = applyUserFees(discountedPrice, customerId);

  await productService.changeStock(productIds, -1);

  return priceWithFees;
};
