const express = require('express');
const mongoose = require('mongoose');

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

app.use(require('./routes/users'));
app.use(require('./routes/cards'));

app.listen(PORT, () => {
});
