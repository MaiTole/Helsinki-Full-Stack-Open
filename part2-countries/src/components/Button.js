import React from 'react'

const Button = ({click, cntry}) => {
    return (
      <>
      <input type='button' value="Show" onClick={click} name={cntry}/>
      </>
    )
  } 

export default Button