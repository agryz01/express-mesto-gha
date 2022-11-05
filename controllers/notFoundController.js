const NotFoundErr = require('../errors/NotFoundErr');

const notFoundController = (req, res, next) => {
  next(new NotFoundErr('Запрашиваемый ресурс не найден'));
  // res.status(statusCode.NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
};

module.exports = notFoundController;
