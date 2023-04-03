var _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((total, blog) => {
      return total + blog.likes;
    }, 0);
};

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) return {};
  blogs = blogs.sort((a, b) => {
    return b.likes - a.likes;
  });
  return blogs[0];
};

const mostBlogs = (blogs) => {
  if(blogs.length === 0) return {};
  const authors = {};
  var topAuthor = { blogs:0 };
  blogs.forEach(element => {
    authors[element.author] === undefined ? authors[element.author] = 1 : authors[element.author] = authors[element.author] + 1;
    if(authors[element.author] > topAuthor.blogs){
      topAuthor = {
        author : element.author, blogs: authors[element.author]
      };}
  });
  return topAuthor;
};

const mostBlogsLodash = (blogs) => {
  if(blogs.length === 0) return {};
  const authors = _.countBy(blogs, (blog) => {
    return blog.author;
  });
  var maxBlogs = { blogs: 0 };
  for (const author of Object.keys(authors)){
    if(authors[author] > maxBlogs.blogs){
      maxBlogs = { author: author, blogs: authors[author] };
    }
  }
  return maxBlogs;
};

const mostLikes = (blogs) => {
  if(blogs.length === 0) return {};
  const authors = _.sortBy(blogs, [(blog) => { return blog.likes; }]);
  console.log('authors', authors);
  const mostLiked = authors[authors.length-1];
  return { author: mostLiked.author, likes: mostLiked.likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostBlogsLodash,
  mostLikes
};