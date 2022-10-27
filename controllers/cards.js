const mongoose = require('mongoose');
const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((user) => res.send(user))
    .catch((err) => {
      res.status(500).send({ message: 'Произошла ошибка', err });
    });
};

const deletCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId).orFail(new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Карточка с указанным _id не найден' });
      }
      if (err instanceof mongoose.Error.CastError) {
        return res.status(400).send({ message: 'Указан не корректный _id' });
      }
      return res.status(500).send({ message: 'Произошла ошибка', err });
    });
};

const createCard = (req, res) => {
  req.body.owner = req.user._id;// eslint-disable-line
  Card.create(req.body)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: 'Ошибка валидации', err });
      }
      return res.status(500).send({ message: 'Произошла ошибка', err });
    });
};

module.exports = { getCards, deletCard, createCard };
