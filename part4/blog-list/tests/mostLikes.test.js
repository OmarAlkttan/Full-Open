const mostLikes = require('../utils/list_helper').mostLikes;

describe('most Blogs', () => {
  test('most likes for author from many blogs', () => {
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
      },
      {
        title: 'Learning MERN STACK',
        author: 'Omar Alktan',
        likes: 65
      }
    ];

    expect(mostLikes(blogs)).toEqual({ author: 'Omar Alktan', likes: 100 });
  });
});