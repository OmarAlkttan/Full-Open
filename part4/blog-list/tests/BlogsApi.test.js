const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/Blog');
const helper = require('./test_helper');

const api = supertest(app);



beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
}, 100000);

describe('testing blogs api', () => {
  test('check status code and content-type when get all blogs', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/);
  });

  test('add blog to db with post request', async () => {
    await api.post('/api/blogs')
      .send({ 'title': 'adding a blog', 'author': 'Omar Alktan', 'url': 'https://github.com/OmarAlkttan', 'likes': 150 })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${await helper.loggedInUserToken()}`)
      .expect(201)
      .expect('Content-Type', /json/);

  });

  test('check content of blogs coming from db', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].author).toBe('Omar Alktan');
  });

  test('verify that blog id called "id" not "__id"', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });

  test('verify adding blog increase system blogs by one', async () => {
    const blogs = await api.get('/api/blogs');
    expect(blogs.body).toHaveLength(helper.initialBlogs.length);

    const token = await helper.loggedInUserToken();

    console.log('token', token);

    await api.post('/api/blogs')
      .send({ 'title': 'adding a blog', 'author': 'Qobtan', 'url': 'https://github.com/OmarAlkttan', 'likes': 60 })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /json/);

    const newBlogs = await api.get('/api/blogs');
    expect(newBlogs.body).toHaveLength(helper.initialBlogs.length + 1);
  });

  test('verify if likes property is missing from request to be 0 as default', async () => {
    const result = await api.post('/api/blogs')
      .send({ 'title': 'adding a blog', 'author': 'Qobtan', 'url': 'https://github.com/OmarAlkttan' })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${await helper.loggedInUserToken()}`)
      .expect(201)
      .expect('Content-Type', /json/);

    expect(result.body.likes).toBe(0);
  });

  test('400 bad request if title or url is missing', async () => {
    await api.post('/api/blogs')
      .send({ 'author': 'Qobtan', 'url': 'https://github.com/OmarAlkttan' })
      .set('Accept', 'application/json')
      .expect(400);

    await api.post('/api/blogs')
      .send({ 'title': 'adding a blog', 'author': 'Qobtan' })
      .set('Accept', 'application/json')
      .expect(400);

  }, 100000);

  test('deleting a blog', async () => {
    const blogsInDbAtStart = await helper.blogsInDb();
    console.log('blog in DB', blogsInDbAtStart);

    const token = await helper.loggedInUserToken();

    await api.post('/api/blogs')
      .send({ 'title': 'adding a blog', 'author': 'Qobtan', 'url': 'https://github.com/OmarAlkttan', 'likes': 60 })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /json/);

    const blogsInDbAtEnd = await helper.blogsInDb();

    await api.delete(`/api/blogs/${blogsInDbAtEnd[blogsInDbAtEnd.length -1].id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const blogs = await api.get('/api/blogs');

    expect(blogs.body).toHaveLength(blogsInDbAtStart.length);
  });

  test('deleting not existing blog', async () => {
    const notFoundId = await helper.nonExistingId();
    await api.delete(`/api/blogs/${notFoundId}`)
      .set('Authorization', `Bearer ${await helper.loggedInUserToken()}`)
      .expect(404);

    const blogs = await api.get('/api/blogs');
    expect(blogs.body).toHaveLength(helper.initialBlogs.length);
  });

  test('verify updating likes get changed', async () => {
    const blogs = await helper.blogsInDb();
    console.log('blogs', blogs);
    const blog = blogs[0];
    console.log('blog', blog);

    const result = await api.put(`/api/blogs/${blog.id}`)
      .send({ 'title': blog.title, 'author': blog.author, 'url': blog.url, 'likes': 235 });
    console.log('result', result);
    expect(result.body.likes).toBe(235);

    const newBlogs = await helper.blogsInDb();
    const newBlog = newBlogs[0];

    expect(newBlog.likes).toBe(235);

  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});


