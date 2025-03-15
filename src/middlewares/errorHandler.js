const CustomError = require('../errors/custom');

module.exports = (err, req, res, next) => {
  if (err instanceof CustomError) {
    console.error(err?.message);

    return res.status(err.code).json({ error: err.message });
  }

  res.status(500).json({ error: 'Internal Server Error' });
};
