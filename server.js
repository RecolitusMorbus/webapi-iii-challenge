const express = require('express');
const morgan = require('morgan');

const server = express();
const userRouter = require('./users/userRouter.js');

/* MIDDLEWARE */
server.use(express.json());
server.use(morgan('dev'));
server.use(logger);

/* ROUTES */
server.use('/api/users', userRouter);

/* SANITY CHECK */
server.get('/', (req, res) => {
  res.send(`Get a dog little longy! –Abraham Lincoln`);
});

/* CUSTOM MIDDLEWARE */
function logger(req, res, next) {
  const time = new Date();
  console.log(`${req.method} ${req.url} ${time}`);
  next();
};

module.exports = server;
