const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 });
  response.json(blogs);
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).end();
  }

  const decodedToken = jwt.verify(request.token, config.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' });
  }

  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: 'user not found ' });
  }

  const blog = new Blog({
    ...request.body,
    user: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {

  if (!request.token) {
    return response.status(401).json({ error: 'need a token to delete ' });
  }

  const decodedToken = jwt.verify(request.token, config.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' });
  }

  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: 'user not found ' });
  }

  const blog = await Blog.findById(request.params.id);
  console.log('blog', blog);

  if (!blog) {
    return response.status(404).end();
  }

  console.log('blog user id === user.id', user._id.toString() === blog.user.toString());

  if (!(user && user._id.toString() === blog.user.toString())) {
    return response.status(401).json({ error: 'user unaouzaried to delete this blog' });
  }
  console.log('blog', blog);
  await Blog.findByIdAndRemove(request.params.id);

  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;
  console.log('body', request.body);

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  console.log('updatedBlog', updatedBlog);
  response.json(updatedBlog);
});

blogsRouter.post('/:id/comments', async (req, res) => {
  const body = req.body;
  const blog = await Blog.findById(req.params.id);
  console.log('post a comment body', body);

  const newBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    comments: [...blog.comments, body.comment]
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, newBlog, { new: true });
  console.log('updatedBlog', updatedBlog);
  res.json(updatedBlog);
});


module.exports = blogsRouter;