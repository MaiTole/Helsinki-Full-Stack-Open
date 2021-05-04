import React from 'react'

const Phonebooklist = ({list, handleDeletion}) => {
  return (
    <>
    {list.map(pax => <ul key={pax.id}> {pax.name} {pax.number} <button onClick={handleDeletion} name={pax.name} id={pax.id}> Delete </button></ul>)}
    </>
  )
}

export default Phonebooklist
