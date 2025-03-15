const mongoose = require('mongoose');

exports.handleTransaction = async (callbacks) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    for (let callback of callbacks) {
      await callback(session);
    }

    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};
