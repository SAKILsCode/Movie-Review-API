const { default: mongoose } = require('mongoose');

const mongooseIdValidator = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = mongooseIdValidator;
