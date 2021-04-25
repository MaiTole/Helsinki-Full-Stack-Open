import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}
const Part = (props) => {
  return (
    <p1>{props.name}</p1>
  )
}
const Total = (props) => {
  return (
    <p>Numbre of exercises {props.name}</p>
  )
}
const App = () => {
  const Content = () => {
    return (
      <div>
      <Part name={course.parts[0].name+' '+course.parts[0].exercises}/> <br />
      <Part name={course.parts[1].name+' '+course.parts[1].exercises}/> <br />
      <Part name={course.parts[2].name+' '+course.parts[2].exercises}/> <br />
      </div>
    )
  }
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
      name: 'Fundamentals of React',
      exercises: 10
      },
      {
      name: 'Using props to pass data',
      exercises: 7
      },
      {
      name: 'State of a component',
      exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header name={course.name} />
      <Content /> <br />
      <Total name={course.parts[0].exercises+course.parts[1].exercises+course.parts[2].exercises} />
    </div>
  );
}

export default App;
