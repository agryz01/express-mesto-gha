const router = require('express').Router();

const User = require('../models/user');

router.get('/users', (req, res) => {
  res.send('все пользоваатели');
});

router.get('/users/:userId', (req, res) => {
  res.send('пользователь');
});

router.post('/users', (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  res.send('добавляем пользователя в базу данных');
});

module.exports = router;
