const mongoose = require('mongoose');
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => {
      res.status(500).send({ message: 'Произошла ошибка', err });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId).orFail(new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
      }
      if (err instanceof mongoose.Error.CastError) {
        return res.status(400).send({ message: 'Указан не корректный _id' });
      }
      return res.status(500).send({ message: 'Произошла ошибка', err });
    });
};

const createUser = (req, res) => {
  User.create(req.body)
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

const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {new: true, runValidators: true})// eslint-disable-line
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: 'Ошибка валидации', err });
      }
      return res.status(500).send({ message: 'Произошла ошибка', err });
    });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {new: true, runValidators: true})// eslint-disable-line
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: 'Ошибка валидации', err });
      }
      return res.status(500).send({ message: 'Произошла ошибка', err });
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
};
