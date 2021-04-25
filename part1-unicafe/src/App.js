import React, { useState } from 'react';

const Statistics = ({all, statsent, text}) => {
  if (all === 0) {
    return (
      <div>
        No feedback available
      </div>
    )
  }
  return (
    <div>
        <tr>
          <th>{text}</th>
          <td>{statsent}</td>
        </tr>
    </div>
  ) 
}

const App = () => {

  const [good, setGood] = useState({gdclicks: 0, gdpts: 0})
  const [neutral, setNeutral] = useState({neutclicks: 0, neutpts: 0})
  const [bad, setBad] = useState({badclicks: 0, badpts: 0})

  const Button = ({handleClick, text}) => (
    <button onClick = {handleClick}>{text}</button>
  )

  const handleGoodClick = () => setGood({gdclicks: good.gdclicks + 1, gdpts: good.gdpts + 1})
  const handleBadClick = () => setBad({badclicks: bad.badclicks + 1, badpts: bad.badpts - 1})
  const handleNeutClick = () => setNeutral({neutclicks: neutral.neutclicks + 1, neutpts: neutral.neutpts - 0})
  const averageClick = (good.gdpts+bad.badpts+neutral.neutpts)/3
  const positiveClick = good.gdclicks*100/(good.gdclicks+bad.badclicks+neutral.neutclicks) + '%'
  const allClicks = good.gdclicks+bad.badclicks+neutral.neutclicks

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text='Good' />        
      <Button handleClick={handleNeutClick} text='Neutral' />        
      <Button handleClick={handleBadClick} text='Bad' />        
      <br />
      <h1>Statistics</h1>
      <table>
      <Statistics all = {allClicks} text = 'Good' statsent = {good.gdclicks} /> 
      <Statistics all = {allClicks} text = 'Bad' statsent = {bad.badclicks} /> 
      <Statistics all = {allClicks} text = 'Neutral' statsent = {neutral.neutclicks} />
      <Statistics all = {allClicks} text = 'All' statsent = {allClicks} />
      <Statistics all = {allClicks} text = 'Average' statsent={averageClick} />
      <Statistics all = {allClicks} text = 'Positive' statsent={positiveClick}/>
      </table>
    </div>
)
}

//<p1>Good {props.gdclicks}</p1><br />
//<p1>Neutral {props.neutclicks}</p1><br />
//<p1>Bad {props.badclicks}</p1><br />
//<p1>All {props.allclicks}</p1><br />
//<p1>Average {props.average}</p1><br />
//<p1>Positive {props.positive} %</p1>
//<Statistics all = {allClicks} gdclicks={good.gdclicks} badclicks={bad.badclicks} neutclicks = {neutral.neutclicks} allclicks = {allClicks} average={averageClick} positive={positiveClick}/>

export default App;
