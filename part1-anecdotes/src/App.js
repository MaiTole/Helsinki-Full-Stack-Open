import React, { useState } from 'react';

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const [selected, setSelected] = useState(0)
  const [points, setUpvote] = useState(new Array(anecdotes.length).fill(0))

  const quoteNo = () => {
    return ( 
      setSelected(Math.floor((Math.random()*anecdotes.length))) 
    )
  }
  const upVote = () => {
    const copypts = [ ...points]
    copypts[selected] += 1
    setUpvote(copypts)
  }
  const maxVoted = () => {
    return points.indexOf(Math.max(...points))
  }

  return (
    <div>
      <h1>Anecdote of the Day </h1>
      {anecdotes[selected]} <br /> has {points[selected]} votes
      <p><Button handleClick={quoteNo} text='Next Quote'/></p>
      <p><Button handleClick={upVote} text='Upvote'/></p>
      <h1>Anecdote with most votes</h1>
      {anecdotes[maxVoted()]} <br /> has {points[maxVoted()]} votes
    </div>
  )
}
export default App;