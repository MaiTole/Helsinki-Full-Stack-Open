import React from 'react'

const Phonebooklist = ({list, handleDeletion, searchFilter}) => {
  const searchresult = list.filter(pax => pax.name.includes(searchFilter))
  if (searchFilter === '') {
    return (
      <>
      {list.map(pax => <ul key={pax.id}> {pax.name} {pax.number} <button onClick={handleDeletion} name={pax.name} id={pax.id}> Delete </button></ul>)}
      </>
    )
  }
  else {
    return (
      <>
      {searchresult.map(pax => <ul key={pax.id}> {pax.name} {pax.number} <button onClick={handleDeletion} name={pax.name} id={pax.id}> Delete </button></ul>)}
      </>
    )
  }
}
export default Phonebooklist