import React, { useState, useEffect } from 'react'
import axios from 'axios'
import List from './components/List'

const App = () => {
  
  const [countries, setCountry] = useState([])
  const [searchterm, setSearch] = useState([])
  const [show, setShow] = useState(true)
  const [ktry, setCntry] = useState([])


  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountry(response.data)
    })
  },[])

  const handleFilterChange = (event) => {
    setSearch(event.target.value)
    setShow(true)
  }

  const click = (event) => {
    const cntry1 = event.target.name
    setCntry(cntry1)
    setShow(false)
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
