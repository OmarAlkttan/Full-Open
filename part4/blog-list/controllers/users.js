const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;
  console.log('password', password);
  if(!password){
    return response.status(400).json({ error: 'User validation failed: password is required' });
  }

  if(password.length < 3){
    return response.status(400).json({ error: 'User validation failed: password must be at least 3 char long' });
  }


  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { user : 0 });
  response.status(200).json(users);
});

module.exports = usersRouter;
