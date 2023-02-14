import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios';
import './App.css'
import Countries from './components/Countries';

function App() {

  const [searchText, setSearchText] = useState('');
  const [countries, setCountries] = useState([]);

  function handleSearch(event){
    const value = event.target.value;
    if(value){
      axios.get(`https://restcountries.com/v3.1/name/${value}`).then(response => {
        const data = response.data;
        console.log('data', data);
        setCountries(data);
      });
    }else{
      setCountries([]);
    }
    setSearchText(value);
  }

  return (
    <>
    <div>
      <label htmlFor="search">find countries </label>
      <input id='search' name='search' type="text" value={searchText} onChange={handleSearch}/>
    </div>
    <Countries countries={countries}/>
    </>
  )
}

export default App
