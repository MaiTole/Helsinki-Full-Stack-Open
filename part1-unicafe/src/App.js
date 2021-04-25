import React, { useState } from 'react';

const Statistics = ({allClicks, text, statsent}) => {
  return (
    <div>
        <tr>
          <th>{text}</th><br/>
          <td>{statsent}</td>
        </tr>
    </div>
  ) 
}

const Statistic = ({good, bad, neutral, all, avg, pos}) => {
  if (all === 0) {
    return (
    <div>
      No feedback given
    </div>
    )
  }
  return (
  <div>
    <table>
      <Statistics text = 'Good' statsent = {good} />
      <Statistics text = 'Neutral ' statsent = {neutral} />
      <Statistics text = 'Bad ' statsent = {bad} /> 
      <Statistics text = 'All ' statsent = {all} />
      <Statistics text = 'Average ' statsent={avg} />
      <Statistics text = 'Positive ' statsent={pos}/>
    </table>
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
      <Statistic good={good.gdclicks} bad={bad.badclicks} neutral={neutral.neutclicks} all={allClicks} avg={averageClick} pos={positiveClick} />
      <table>
      
      </table>
    </div>
)
}

export default App;
