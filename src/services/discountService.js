const { isHoliday } = require('poland-public-holidays');
const { isLastFridayOfNovember } = require('../helpers/time');

exports.applyDiscount = (price, products) => {
  const date = new Date();

  const discountConfig = [
    { isApplicable: () => true, discount: 0 },
    { isApplicable: () => isLastFridayOfNovember(date), discount: 25 },
    { isApplicable: () => isHoliday(date), discount: 15 },
    { isApplicable: () => products.length >= 50, discount: 30 },
    { isApplicable: () => products.length >= 10, discount: 20 },
    { isApplicable: () => products.length >= 5, discount: 10 },
  ];

  const discount = Math.max(
    ...discountConfig
      .filter((config) => config.isApplicable())
      .map((config) => config.discount)
  );

  const discountAmount = (price * discount) / 100;
  const finalPrice = price - discountAmount;

  return parseFloat(finalPrice.toFixed(2));
};
