const mongoose = require('mongoose');
const Card = require('../models/card');
const { statusCode } = require('../utils/statusCode');

const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(() => {
      res.status(statusCode.NTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

const deletCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId).orFail(new Error('NotFound'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(statusCode.NOT_FOUND).send({ message: 'Карточка с указанным _id не найден' });
      }
      if (err instanceof mongoose.Error.CastError) {
        return res.status(statusCode.BAD_REQUEST).send({ message: 'Указан не корректный _id' });
      }
      return res.status(statusCode.NTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

const createCard = (req, res) => {
  req.body.owner = req.user._id;
  Card.create(req.body)
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(statusCode.BAD_REQUEST).send({ message: 'Ошибка валидации' });
      }
      return res.status(statusCode.NTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(new Error('NotFound'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(statusCode.NOT_FOUND).send({ message: 'Карточка с указанным _id не найден' });
      }
      if (err instanceof mongoose.Error.CastError) {
        return res.status(statusCode.BAD_REQUEST).send({ message: 'Указан не корректный _id' });
      }
      return res.status(statusCode.NTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(new Error('NotFound'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(statusCode.NOT_FOUND).send({ message: 'Карточка с указанным _id не найден' });
      }
      if (err instanceof mongoose.Error.CastError) {
        return res.status(statusCode.BAD_REQUEST).send({ message: 'Указан не корректный _id' });
      }
      return res.status(statusCode.NTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  getCards,
  deletCard,
  createCard,
  likeCard,
  dislikeCard,
};
