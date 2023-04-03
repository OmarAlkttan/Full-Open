const favoriteBlog = require('../utils/list_helper').favoriteBlog;

describe('favoriteBlog', () => {
  test('return blog with most likes', () => {
    const blogs = [
      {
        title: 'Learning Javascript',
        author: 'Alaa Mostafa',
        likes: 10
      },
      {
        title: 'Testing node project with jest',
        author: 'Omar Alktan',
        likes: 100
      },
      {
        title: 'Building Ios Mobile Application with swift',
        author: 'Zbaady',
        likes: 70
      }
    ];

    expect(favoriteBlog(blogs)).toEqual({
      title: 'Testing node project with jest',
      author: 'Omar Alktan',
      likes: 100
    });
  });

  test('empty blog should return empty object', () => {
    expect(favoriteBlog([])).toEqual({});
  });
});