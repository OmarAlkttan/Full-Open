import { useState } from "react";
import CountryDetails from "./CountryDetails";

function Country({country}){
  console.log('country', country)

  const [show, setShow] = useState(false);

  function showDetails(){
    show ? setShow(false) : setShow(true);
  }
  
  console.log('flag', country.flags[0]);
  console.log('latlng', country.latlng)
  return(
    <>
      <p>{country.name.common} <button onClick={showDetails}>{show? 'hide': 'show'}</button></p>
      <CountryDetails country={country} show={show}/>
    </>
  )
}

export default Country;