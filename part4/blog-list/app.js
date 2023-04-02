const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs');
const morgan = require('morgan');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const config = require('./utils/config');

app.use(cors())
morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.json())
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;