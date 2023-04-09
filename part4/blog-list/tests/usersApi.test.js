const bcrypt = require('bcrypt');
const User = require('../models/User');
const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const api = supertest(app);

describe('where there is initially one user in DB', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('salsa', 10);

    const user = new User({
      username: 'omar',
      passwordHash
    });

    await user.save();
  });

  test('creation is succeed with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: 'alaa mostafa',
      username: 'elLOL',
      password: 'alaaElLOL'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /json/);

    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd.length).toEqual(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(user => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('create a user with username less than 3 char should get error', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'om',
      name: 'omar Alktan',
      password: 'omarALktan'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);

    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd.length).toEqual(usersAtStart.length);
  }, 100000);

  test('create a user without username field should get error', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: 'omar Alktan',
      password: 'omarALktan'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);

    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd.length).toEqual(usersAtStart.length);
  }, 100000);

  test('create a user with password less than 3 char should get error', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'omar',
      name: 'omar Alktan',
      password: 'om'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);

    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd.length).toEqual(usersAtStart.length);
  }, 100000);

  test('create a user without password field should get error', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: 'omar Alktan',
      username: 'omar'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);

    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd.length).toEqual(usersAtStart.length);
  }, 100000);

  afterAll(async () => {
    await mongoose.connection.close();
  });
});