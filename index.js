require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')
const Contact = require('./models/persons')
const { response } = require('express')

const password = process.argv[2]

app.use(cors())

morgan.token('content', function getName (req) { 
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  else {
    return []
  }
})

app.use(express.json(), express.static('build'), morgan(':method :url :status :res[content-length] - :response-time ms :content'),cors())

//++++++++++++++ GET INDEX PAGE AND FULL LIST OF CONTACTS ++++++++++++++++//


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request,response) => {
  Contact.find({}).then(result => {
    response.json(result)
  })
})


//++++++++++++++ GET INIDIVIDUAL CONTACT BASED ON ID ++++++++++++++++//

app.get('/api/persons/:id', (request,response,next) => {
  Contact.find({'_id': request.params.id})
    .then(result => {
      response.json(result)
    })
    .catch(error => {
      next(error)
    })
})

//++++++++++++++ GET INFO ON NUMBER OF CONTACTS ++++++++++++++++//

app.get('/api/info', (request,response) => {
  Contact.countDocuments()
    .then(numofpersons =>
      response.send(
        `<p1>Phonebook has info for ${numofpersons} people <br/> </p1> 
        <br/> 
        <p1>${new Date()}</p1>`)
    )
})

//++++++++++++++ DELETE SPECIFIC CONTACT ENTRY ++++++++++++++++//

app.delete('/api/persons/:id', (request, response, next) => {
  //const id = Number(request.params.id)
  Contact.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

//++++++++++++++ ADD NEW CONTACT TO PHONEBOOK ++++++++++++++++//

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name and number must both be provided'
    })
  }

  const pax = new Contact({
    name: body.name,
    number: body.number
  })
    
  pax.save()
    .then(savedPax => {
      response.json(savedPax)
    })
    .catch(error => next(error))
})

//++++++++++++++ UPDATE EXISTING CONTACT INFO ++++++++++++++++//

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const newContact = {
    name: body.name,
    number: body.number
  }

  Contact.findByIdAndUpdate(request.params.id, newContact, {new: true})
    .then(updatedContact => {
      response.json(updatedContact)
    })
    .catch(error => next(error))
})

//++++++++++++++ ERROR HANDLING MIDDLEWARE ++++++++++++++++//

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if ((error.name) === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})