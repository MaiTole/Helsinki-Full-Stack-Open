import React from 'react'

const Nation = ({nation}) => {
  const languages = nation.map(country => country.languages)
  const latlon = nation.map(country => country.latlng)
  return (
    <div>
      <h1>{nation.map(country => country.name)}</h1>
      <p>Capital {nation.map(country => country.capital)}</p>
      <p>Population {nation.map(country => country.population)}</p>
      <img width='30%' alt="National flag" src={nation.map(country => country.flag)} />
      <h1>Spoken Languages </h1> <p>{languages.map(lang => lang.map(l => <li key={l.name}> {l.name}</li>))}</p>
      <h1> Weather in {nation.map(country => country.capital)} </h1>
      <img width='50%' alt="Weather" src={`http://www.7timer.info/bin/civil.php?lon=${parseFloat(latlon[0][1])}&lat=${parseFloat(latlon[0][0])}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`} />
    </div>
  )
}

export default Nation