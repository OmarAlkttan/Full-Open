const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('../models/book.js')
const Author = require('../models/author.js')
const User = require('../models/user.js')

const resolvers = {
  Query: {
    bookCount: async () => Author.collection.countDocuments(),
    authorCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books = await Book.find(args.author ?
        args.genre ?
          { author: args.author, genre: args.genre } :
          { author: args.author }
        : args.genre ? { genres: args.genre } : {}).populate('author');
      books = books.map(book => {
        let { author, ...newBook } = book
        newBook = newBook._doc;
        newBook.author = author.name;
        newBook.id = newBook._id;
        console.log('new book', newBook);
        return newBook;
      })

      return books;
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      return Book.where({ author: root.id }).countDocuments();
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const { author, ...rest } = args;
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      let dbAuthor = await Author.findOne({ name: author })
      if (rest.title.length < 4) {
        return new GraphQLError('too short, title must be more than 3 chars',
          {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title
            }
          })
      }
      if (!dbAuthor) {
        if (author.length < 4) {
          return new GraphQLError('too short, author name must be more than 3 chars',
            {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: author
              }
            })
        }
        author = await Author.create({ name: author, bookCount: 1 })
      }
      console.log(dbAuthor._id.toString());
      const book = await Book.create({ author: dbAuthor._id.toString(), ...rest })

      const addedBook = await Book.findById(book._id).populate('author')

      console.log('added book: ' + addedBook);

        const newBook = addedBook._doc;
        newBook.author = addedBook.author.name;
        newBook.id = addedBook._id;
        console.log('new book', newBook);

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

      return newBook;
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      author.born = args.setBornTo;
      return await author.save();
    },
    createUser: async (root, args) => {
      console.log(args);
      return User.create({ ...args }).catch(error => {
        throw new GraphQLError('Creating the user failed ', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: { username: args.username, favoriteGenre: args.favoriteGenre },
            error
          }
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials: ', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers