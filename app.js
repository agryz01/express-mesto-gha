const express = require('express');
const mongoose = require('mongoose');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { handlerErrors } = require('./middlewares/handlerErrors');

const notFoundController = require('./controllers/notFoundController');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', notFoundController);

app.use(handlerErrors);

app.listen(PORT, () => {
});
