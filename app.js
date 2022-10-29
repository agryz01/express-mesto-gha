const express = require('express');
const mongoose = require('mongoose');

const notFoundController = require('./controllers/notFoundController');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '635958bb4042f790a68525c8',
  };
  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', notFoundController);

app.listen(PORT, () => {
});
