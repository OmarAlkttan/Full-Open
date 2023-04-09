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

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'is required'],
    validate: {
      validator: function(v){
        console.log('name', v);
        return /.{3,}/.test(v);
      }
    },
    message: props => 'username must be at least 3 char long'
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;