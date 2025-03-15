const { applyDiscount } = require('./discountService');
const { applyUserFees } = require('./userService');
const productCommandHandler = require('../commands/productCommandHandler');
const productQueryHandler = require('../queries/productQueryHandler');
const { handleTransaction } = require('../helpers/handleTransaction');

exports.createOrder = async (customerId, productIds) => {
  const products = await productQueryHandler.getByIds(productIds);
  const totalPrice = products.reduce((acc, product) => acc + product.price, 0);
  const discountedPrice = applyDiscount(totalPrice, products);
  const priceWithFees = applyUserFees(discountedPrice, customerId);

  await handleTransaction(
    productIds.map(
      (productId) => (session) =>
        productCommandHandler.changeStock({
          id: productId,
          quantity: -1,
          session,
        })
    )
  );

  return priceWithFees;
};
