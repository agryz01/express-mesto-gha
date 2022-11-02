const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { statusCode } = require('../utils/statusCode');

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(() => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId).orFail(new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(statusCode.NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
      }
      if (err instanceof mongoose.Error.CastError) {
        return res.status(statusCode.BAD_REQUEST).send({ message: 'Указан не корректный _id' });
      }
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

const createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(statusCode.BAD_REQUEST).send({ message: 'Ошибка валидации' });
      }
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(statusCode.BAD_REQUEST).send({ message: 'Ошибка валидации' });
      }
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(statusCode.BAD_REQUEST).send({ message: 'Ошибка валидации' });
      }
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

const login = (req, res) => {
  const { email, password } = req.body; return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const getUserMe = (req, res) => {
  User.findById(req.user._id, req.body)
    .then((user) => res.send(user))
    .catch(() => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  login,
  getUserMe,
};
