const productCommandHandler = require('../commands/productCommandHandler');
const productQueryHandler = require('../queries/productQueryHandler');
const { handleTransaction } = require('../helpers/handleTransaction');
const CustomError = require('../errors/custom');

exports.getProducts = async (ids) => {
  const products = await (ids
    ? productQueryHandler.getByIds(ids)
    : productQueryHandler.getAllProducts());

  return products.map((product) => product.toJSON());
};

exports.createProduct = async ({ name, description, price, stock }) => {
  return productCommandHandler.createProduct({
    name,
    description,
    price,
    stock,
  });
};

const updateProductStock = async ({ id, quantity, session }) => {
  const didChange = await productCommandHandler.changeStock({
    id,
    quantity,
    session,
  });
  if (didChange) {
    return;
  }

  // update did not happen, so if quantity is negative and product exists
  // theres not enough in stock
  if (quantity < 0 && (await productQueryHandler.get(id, session))) {
    throw new CustomError(`Not enough in stock ${id}`, 400);
  }

  // otherwise because couldnt be found
  throw new CustomError(`Not found ${id}`, 404);
};

exports.changeStock = async (ids, quantity) => {
  if (!ids.length) {
    return;
  }
  if (ids.length === 1) {
    await updateProductStock({ id: ids[0], quantity });
  } else {
    await handleTransaction(
      ids.map(
        (id) => (session) =>
          updateProductStock({
            id,
            quantity,
            session,
          })
      )
    );
  }
};
