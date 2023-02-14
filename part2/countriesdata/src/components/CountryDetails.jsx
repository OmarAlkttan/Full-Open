import { useEffect, useState } from "react";
import axios from "axios";

function CountryDetails({country, show}){

  const [weather, setWeather] = useState({});
  /*useEffect(()=>{
    axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${country.latlng[0]}&lon=${country.latlng[1]}&exclude=hourly,daily&appid=${import.meta.env.VITE_WEATHER_API_KEY}`).then(response=> {
    console.log('data', response.data)  
    setWeather(response.data)});
  }, [])*/
  console.log('languages', country.languages)
  const languages = [];
  for(const language in languages){
    languages.push(language);
  }

  if(!show){
    return <></>
  }
  
  return(
    <div>
      <h3>{country.name.common}</h3>
      <p>capital {country.capital} <br /> area {country.area}</p>
      <h4>languages</h4>
      <ul>
        {Object.values(country.languages).map((language)=> {
          return <li key={language}>{language}</li>
        })}
      </ul>
      <img src={country.flags.svg} alt="country_flag" style={{width: '20rem', height: '20rem'}} />
      <h3>Weather in {country.capital}</h3>
    </div>
  )
}

export default CountryDetails;