const personRouter = require('express').Router();
const Person = require('../models/person.js');

personRouter.get('/', (req, res) => {
  Person.find({}).then(result => res.json(result));
});

personRouter.get('/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if(person){
      res.json(person);
    }else{
      res.status(404).end();
    }
  }).catch(err => next(err));

});

personRouter.delete('/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id).then(result => {
    res.status(204).end();
  }).catch(err => next(err));

});

personRouter.post('/', (req, res) => {
  const body = req.body;
  console.log(body);

  const person = new Person({
    name: body.name,
    number: body.number
  });
  person.save().then(p => {
    res.json(p);
  }).catch(err => {
    res.status(400).json({ error: err.message });
  });
});

personRouter.put('/:id', (req, res, next) => {
  const body = req.body;
  console.log('body', body);
  if(!body.number){
    return res.status(400).json({
      error: 'missing number'
    });
  }

  const person = {
    name: body.name,
    number: body.number
  };

  Person.findByIdAndUpdate(req.params.id, person, { new : true }).then(updatedPerson => {
    res.json(updatedPerson);
  }).catch(err => next(err));
});

module.exports = personRouter;