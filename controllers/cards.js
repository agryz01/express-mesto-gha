const mongoose = require('mongoose');
const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => {
      res.status(500).send({ message: 'Произошла ошибка', err });
    });
};

const deletCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId).orFail(new Error('NotFound'))
    .then((card) => res.send(card))
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
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: 'Ошибка валидации', err });
      }
      return res.status(500).send({ message: 'Произошла ошибка', err });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },// eslint-disable-line
    { new: true },
  ).orFail(new Error('NotFound'))
    .then((card) => {
      res.status(200).send(card);
    })
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

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },// eslint-disable-line
    { new: true },
  ).orFail(new Error('NotFound'))
    .then((card) => {
      res.status(200).send(card);
    })
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

module.exports = {
  getCards,
  deletCard,
  createCard,
  likeCard,
  dislikeCard,
};
