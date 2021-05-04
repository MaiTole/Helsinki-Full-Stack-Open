import React from 'react'

const Newentry = ({nameinput, numberinput, namehandler, numhandler}) => {
  return (
    <>
    <div>
      Name: <input name='newName' value={nameinput} onChange={namehandler}/>
      Number: <input name='newNumber' value={numberinput} onChange={numhandler}/>
    </div>
    <div>
      <br />
      <button type='submit'>Add New</button>
    </div>
    </>
)
}

export default Newentry