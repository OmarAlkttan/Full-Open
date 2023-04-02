const Person = require('./models/person');
const config = require('./utils/config');
const logger = require('./utils/logger');

const app = require('./app');

app.get('/api/info', (req, res) => {
  Person.find({}).then(result => {
    res.send(`<p>Phonebook has info for ${
      result.length
    } people <br><br> ${new Date()} </p> `);
  });

});


app.listen(config.PORT, () => {
  logger.info(`Server is running on port ${config.PORT}`);
});