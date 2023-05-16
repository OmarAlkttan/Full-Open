const mongoose = require('mongoose');
const config = require('../utils/config');
const logger = require('../utils/logger');

mongoose.set('strictQuery', false);
const url = config.MONGODB_URI;

logger.info(`connecting to ${url}`);

mongoose.connect(url)
  .then(() => {
    logger.info('connected to mongodb');
  }).catch((err) => {
    logger.error('error connecting to mongodb', err.message);
  });

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: { type: Array, required: false }
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Blog', blogSchema);