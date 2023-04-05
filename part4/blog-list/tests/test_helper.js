const Blog = require('../models/Blog');

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

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb
};