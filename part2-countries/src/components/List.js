import React from 'react'
import Nation from './Nation'
import Button from './Button'

const List = ({countries, searchterm, show, click, ktry}) => {
    const filteredlist = countries.filter(country => country.name.includes(searchterm))
    const test = countries.filter(country => country.name.includes(ktry))
    
    if (filteredlist.length > 10) {
      return(
        <div>
          <p>Too many matches, please specify another filter</p>
        </div>
      )     
    }
    else if (filteredlist.length === 1) {
      return (
        <>
        <Nation nation={filteredlist} />
        </>
      )
    }
    else {
      if (show === true)
      return (
        <>
          {filteredlist.map(country => <p id='id' key={country.name}>{country.name}<Button click={click} cntry={country.name}/> </p>)}

        </>
       )
      if (show === false)
      return (
        <>
        <Nation nation={test}/>
        </>
       )
    }
}

export default List