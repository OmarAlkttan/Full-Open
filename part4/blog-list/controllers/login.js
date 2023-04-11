const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const config = require('../utils/config');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  console.log('user', user);
  const passwordCorrect = user === null ? false
    : bcrypt.compare(password, user.passwordHash);

  if(!(user && passwordCorrect)) {
    return response.status(401).json({ error : 'Username or password is incorrect' });
  }

  const userForToken = {
    username: username,
    id: user._id
  };

  const token = jwt.sign(userForToken, config.SECRET);

  response.status(200).json({ token, username: user.username, name: user.name });

});

module.exports = loginRouter;