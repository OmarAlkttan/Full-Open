import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons'
import axios from 'axios';
import personService from './services/personService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({name: '', number: ''});
  const [searchedName, setSearchedName] = useState('');

  const personsToShow = persons.filter(person=>{
    return person.name.toLowerCase().includes(searchedName.toLowerCase());
  });

  useEffect(()=>{
    console.log('effect');
    personService.getAll().then(data => setPersons(data));
  }, [])

  console.log('render', persons.length, 'persons');

  console.log(personsToShow);

  function addName(event){
    event.preventDefault();
    console.log(event.target);
    const name = {
      name : newPerson.name,
      number : newPerson.number
    }
    console.log(persons.find(person=> person.name === name.name));
    const person = persons.find(person=> person.name === name.name);
    if(person == undefined){
      personService.add(name).then(data => setPersons(persons.concat(data)));
    }else {
      if(person.number !== name.number){
        if(window.confirm(`${name.name} is already added to phonebook, replace the old number with the new number ?`)){
          personService.update(person.id, name).then(()=>{
            personService.getAll().then(data => setPersons(data));
          });
        }
        
      }else{
        alert(`${newPerson.name} is already added to phonebook`);
      }
    }
    setNewPerson({name: '', number: ''});
  }

  function handleChangeName(event){
    setNewPerson({...newPerson, name : event.target.value});
  }

  function handleChangeNumber(event){
    setNewPerson({...newPerson, number : event.target.value});
  }

  const handleChangeFilter = function(event){
    console.log(event.target.value);
    setSearchedName(event.target.value);
  }

  function handleRemove(person){
    if(window.confirm(`Delete ${person.name}`)){
      personService.remove(person.id).then(()=>{
        personService.getAll().then(data => setPersons(data));
      });
    }
  }

  return (
    <div className='container'>
      <h2>Phonebook</h2>
      <Filter value={searchedName} onChange={handleChangeFilter}/>
      
      <h2>add a new</h2>
      <PersonForm addName={addName} newPerson={newPerson} handleChangeName={handleChangeName} handleChangeNumber={handleChangeNumber} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDelete={handleRemove} />
    </div>
  )
}

export default App