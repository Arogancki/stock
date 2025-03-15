const CustomError = require('../errors/custom');

// let imageine is fetched from somewhere
const users = [
  { customerId: 1, location: 'US' },
  { customerId: 2, location: 'EUROPE' },
  { customerId: 3, location: 'ASIA' },
];

const locationFees = {
  EUROPE: 15,
  ASIA: -5,
};

exports.applyUserFees = (price, customerId) => {
  const user = users.find((u) => u.customerId === customerId);

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  const fees = locationFees[user.location] || 0;

  const feesAmount = (price * fees) / 100;
  const finalPrice = price - feesAmount;

  return parseFloat(finalPrice.toFixed(2));
};
