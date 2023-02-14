import Country from "./Country"
import { useState } from "react";

function Countries({countries}){

  const [showCountry, setShowCountry] = useState(false);

  if(countries.length > 10){
    return(
      <p>Too Many matches, specifiy another filter</p>
    )
  }
  if(countries.length === 1){
    return <Country country={countries[0]} />
  }
  if(countries.length === 0){
    return <></>
  }

  return(
    <div>
      {countries.map((country)=>{
        return(
          <>
            <Country key={country.ccn3} country={country}/>
          </>
        )
      })}
    </div>
  )
}

export default Countries;