const Blog = require('../models/Blog');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const initialBlogs = [
  {
    title: 'Testing backend api with jest',
    author: 'Omar Alktan',
    url: 'https://github.com/OmarAlkttan',
    likes: 150,
  },
  {
    title: 'Learning MEARN Stack in iti',
    author: 'Alaa Mostafa',
    url: 'https://github.com/3la2Mostafa',
    likes: 1500,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url: 'https://github.com/OmarAlkttan' });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  console.log('blogs in db', blogs);
  return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  console.log('users in db', users);
  return users.map(user => user.toJSON());
};

const loggedInUserToken = async () => {

  const users = await User.find({});

  let newUser;

  if(users.length > 0){
    newUser = users[0];
  }else{
    const user = new User({
      username: 'test',
      passwordHash: 'test',
      name: 'omar'
    });

    newUser = await user.save();
  }

  const userForToken = {
    username: newUser.username,
    id: newUser._id
  };

  const token = jwt.sign(userForToken, config.SECRET);

  return token;
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  loggedInUserToken
};