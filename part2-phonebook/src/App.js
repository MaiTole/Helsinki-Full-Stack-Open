import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import serviceList from './services/persons'
import Newentry from './components/Newentry'
import Phonebooklist from './components/Phonebooklist'
import Notification from './components/Notification'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newEntry, setNewEntry] = useState({newName: 'Emma Doe', newNumber: 88888888})
  const [searchFilter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [listShown, setListShown] = useState(persons)
  const [errormessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    serviceList
    .getall()
    .then(initialpersonslist => {setPersons(initialpersonslist)})
  },[persons])

  React.useEffect(() => {
    if (persons !== [] && showAll === true) {
      setListShown(persons)}}, [persons, showAll])

  // Function to check if name exists in phonebook, and add entry to phonebook if not
  const addEntry = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newEntry.newName,
      number: newEntry.newNumber
    }
    const paxtoupdate = persons.filter(pax => pax.name.includes(newEntry.newName))
    const idtoupdate = paxtoupdate.map(pax => pax.id)
    const newEntryState = { newName: '', newNumber: '' }

    // Check and reject if any empty fields in Name/Number
    if (newEntry.newName === '') {
      window.alert(`Please enter a valid name`)
    }
    else if (newEntry.newNumber === '') {
      window.alert(`Please enter a valid number`)
    }
    //Check if entry exists and alert user if so - deny duplicate entries
    else if ((persons.map(pax=>pax.name)).includes(newEntry.newName) & (persons.map(pax=>pax.number)).includes(newEntry.newNumber)) {
      window.alert(`${newEntry.newName} already exists in phonebook`)
      setNewEntry({newName:'', newNumber: ''})
    }
    //Check if entry exists and number has changed - if so prompt for user confirmed before updating number in phonebook
    else if ((persons.map(pax=>pax.name)).includes(newEntry.newName)) {
      window.confirm(`${newEntry.newName} already exists in phonebook, would you like to replace the old number with a new one?`)
      serviceList
      .update(idtoupdate, nameObject)
      .then(returnedentry => {
        console.log(returnedentry)
        setPersons(persons.filter(pax => pax.id !== idtoupdate ? pax : returnedentry))
        setErrorMessage(`${newEntry.newName}'s number was successfully updated`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
      .catch(error => {
        setErrorMessage(`Unable to perform operation as ${newEntry.newName}'s contact has already been deleted`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })

    }
    else {
      serviceList
      .create(nameObject)
      .then(
        returnedEntry => {
        setPersons(persons.concat(returnedEntry))
        setListShown(persons.concat(returnedEntry))
        setErrorMessage(`${newEntry.newName}'s contact was successfully added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setNewEntry(newEntryState)
        setShowAll(true)
        }
      )   
    }
  }

  //Function to filter and update value of setList based on filter applied
  const filterSearch = (event) => {
    const result = (event.target.value !== '') ? setShowAll(false) : setShowAll(true)
    const filtered = persons.filter(pax => pax.name.includes(event.target.value))
    console.log(filtered)
    showAll ? setListShown(persons) : setListShown(filtered)
  }
  // Function to handle input new name for addition to phonebook
  const handleNameChange = (event) => { 
  setNewEntry({...newEntry, newName: event.target.value});
  }
  // Function to handle input new number for addition to phonebook
  const handleNumberChange = (event) => { 
    setNewEntry({...newEntry, newNumber: event.target.value});
  }
  //Function to handle search filter on phonebook entries
  const handleFilterChange = (event) => {
     setFilter(event.target.value)
  }

  const handleDeletion = (event) => {
    //const paxtoremove = persons.filter(pax=>pax.name.includes(event.target.name))
    const idtoremove = event.target.id
    if (window.confirm(`Do you want to delete ${event.target.name}'s contact?`) === true) {
      serviceList
      .remove(idtoremove) 
      .then(returnedlist => {
        console.log(returnedlist)
        setPersons(persons.filter((person)=> person.id !== idtoremove))
        setListShown(persons.filter((person)=> person.id !== idtoremove))
        setErrorMessage(`${event.target.name}'s contact was successfully deleted`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      }
      )
      .catch(error => {
        setErrorMessage(`Unable to perform operation as ${newEntry.newName}'s contact has already been deleted`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
    }
  }

return (
<div>
  <h2>Phonebook</h2>
  <form onChange={filterSearch}>
  <Search searchFilter={searchFilter} handleFilterChange={handleFilterChange}/>
  </form>
  <Notification message={errormessage} />
  <h2> Add a New Entry</h2>
  <form onSubmit={addEntry}>
    <Newentry nameinput={newEntry.newName} numberinput={newEntry.newNumber} namehandler={handleNameChange} numhandler={handleNumberChange}/>
  </form>
  <h2>Numbers</h2>
  <Phonebooklist list={listShown} handleDeletion={handleDeletion}/>
</div>
)
}
export default App;