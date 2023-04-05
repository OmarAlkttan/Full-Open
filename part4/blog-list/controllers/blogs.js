const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  if(!request.body.title|| !request.body.url){
    return response.status(400).end();
  }

  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndRemove(request.params.id);
  console.log('result', result);
  result === null ? response.status(404).end() : response.status(204).end();
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

module.exports = blogsRouter;