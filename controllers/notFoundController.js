const { statusCode } = require('../utils/statusCode');

const notFoundController = (req, res) => {
  res.status(statusCode.NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
};

module.exports = notFoundController;
