import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Nation = ({filteredlist}) => {
  const languages = filteredlist.map(country => country.languages)
  const latlon = filteredlist.map(country => country.latlng)

  return (
    <div>
      <h1>{filteredlist.map(country => country.name)}</h1>
      <p>Capital {filteredlist.map(country => country.capital)}</p>
      <p>Population {filteredlist.map(country => country.population)}</p>
      <img width='30%' alt="National flag" src={filteredlist.map(country => country.flag)} />
      <h1>Spoken Languages </h1> <p>{languages.map(lang => lang.map(l => <li>{l.name}</li>))}</p>
      <h1> Weather in {filteredlist.map(country => country.capital)} </h1>
      <img width='50%' alt="Weather" src={`http://www.7timer.info/bin/civil.php?lon=${parseFloat(latlon[0][1])}&lat=${parseFloat(latlon[0][0])}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`} />
    </div>
  )
}

 const Button = ({click, cntry}) => {
  return (
    <>
    <input type='button' value="Show" onClick={click} name={cntry}/>
    </>
  )
} 

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
        {console.log('printed filter')}
        <Nation filteredlist={filteredlist} />
        </>
      )
    }
    else {
      if (show === true)
      return (
        <>
          {console.log('printed list')}
          {filteredlist.map(country => <p id='id' key={country.name}>{country.name}<Button click={click} cntry={country.name}/> </p>)}

        </>
       )
      if (show === false)
      return (
        <>
        {console.log('printed test')}
        <Nation filteredlist={test}/>
        </>
       )
    }
}

const App = () => {
  
  const [countries, setCountry] = useState([])
  const [searchterm, setSearch] = useState([])
  const [show, setShow] = useState(true)
  const [ktry, setCntry] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountry(response.data)
    })
  },[])

  console.log('render', countries.length, 'countries')

  const handleFilterChange = (event) => {
    setSearch(event.target.value)
    triggerSearch()
  }

  const triggerSearch = () => {
      countries.filter(country => country.name.includes(searchterm))
      console.log('triggered search')
      setShow(true)
  }

  const click = (event) => {
    const cntry1 = event.target.name
    setShow(false)
    setCntry(cntry1)
    console.log('triggered show')
  }

  return (
  <div>
    <form>
      Find Countries: <input value={searchterm} onChange={handleFilterChange} />
      <List countries={countries} searchterm={searchterm} show={show} click={click} ktry={ktry} />
      <br />
    </form>
  </div>
  )
}

export default App;
