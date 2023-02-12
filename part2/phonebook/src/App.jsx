import { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newPerson, setNewPerson] = useState({name: '', number: ''});
  const [searchedName, setSearchedName] = useState('');

  const personsToShow = persons.filter(person=>{
    return person.name.toLowerCase().includes(searchedName.toLowerCase());
  })

  console.log(personsToShow);

  function addName(event){
    event.preventDefault();
    console.log(event.target);
    const name = {
      name : newPerson.name,
      number : newPerson.number
    }
    console.log(persons.find(person=> person.name === name.name));
    if(persons.find(person=> person.name === name.name) == undefined){
      setPersons(persons.concat(name))
    }else{
      alert(`${newPerson.name} is already added to phonebook`);
    }
    setNewPerson({name: '', number: ''});
  }

  function handleChangeName(event){
    console.log(event.target.value)
    setNewPerson({...newPerson, name : event.target.value});
  }

  function handleChangeNumber(event){
    console.log(event.target.value);
    setNewPerson({...newPerson, number : event.target.value});
  }

  const handleChangeFilter = function(event){
    console.log(event.target.value);
    setSearchedName(event.target.value);
  }

  return (
    <div className='container'>
      <h2>Phonebook</h2>
      <Filter value={searchedName} onChange={handleChangeFilter}/>
      
      <h2>add a new</h2>
      <PersonForm addName={addName} newPerson={newPerson} handleChangeName={handleChangeName} handleChangeNumber={handleChangeNumber} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App