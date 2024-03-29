const logger = require('./logger');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const User = require('../models/User');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const token = getTokenFrom(request);
  console.log('token', token);
  request.token = token;

  next();
};

const userExtractor = async (request, response, next) => {
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, config.SECRET);
  if(decodedToken.id){
    const user = await User.findById(decodedToken.id);
    request.user = user;
  }

  next();
};

const getTokenFrom = request => {
  const authorization = request.get('authorization');
  console.log('authorizen token', authorization);
  if(authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '');
  }

  return null;
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
};