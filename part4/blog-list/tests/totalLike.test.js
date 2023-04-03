const totalLikes = require('../utils/list_helper').totalLikes;

describe('total likes', () => {
  test('of empty list is 0', () => {
    expect(totalLikes([])).toBe(0);
  });

  test('when list only have blog equals the likes of that', () => {
    const blogs = [
      {
        title: 'Testing total likes',
        author: 'Omar Alktan',
        url: 'https://github.com/OmarAlkttan',
        likes: 100
      }
    ];

    const likes = totalLikes(blogs);

    expect(likes).toBe(100);
  });

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {
        title: 'Testing total likes',
        author: 'Omar Alktan',
        url: 'https://github.com/OmarAlkttan',
        likes: 100
      },
      {
        likes: 2
      },
      {
        likes: 129
      },
      {
        likes: 5231
      }
    ];

    const likes = totalLikes(blogs);

    expect(likes).toBe(5462);
  });
});