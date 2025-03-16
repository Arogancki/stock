const orders = [];

exports.create = async (data, productRepository, discountService) => {
  const { customerId, products } = data;
  for (const item of products) {
    await productRepository.sell(item.id, item.quantity);
  }
  let order = { id: orders.length + 1, customerId, products };
  order = discountService.calculateDiscount(order, customerId);
  orders.push(order);
  return order;
};
