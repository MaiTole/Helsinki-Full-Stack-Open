import React from 'react';

const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
  
      </div>
    )
  }
  
const Header = ({name}) => {
    return (
      <h1>{name}</h1>
    )
  }
const Content = ({parts}) =>
  {
    return (
      parts.map(partial => <Part key={partial.id} part={partial} />)
    )
  }
  
const Part = ({part}) => {
    return (
      <p key={part.id}>{part.name} {part.exercises}</p>
    )
  } 

const Total = ({parts}) => {
    const newtotal = parts.map(partial => partial.exercises).reduce((a,b) => a+b, 0)
    return (
      <>
        Total number of exercises is {newtotal}
      </>
    )
  }

export default Course