const mongoose = require('mongoose')

if (process.argv.length == 4) {
      console.log('Please provide the name, and number as an argument: node mongo.js <password> <name> <number>')
      process.exit(1)
}

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://user1:${password}@cluster0.n0hb2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const contactSchema = new mongoose.Schema({
    name: String,
    number: Number,
  })

const Contact = mongoose.model('Contact', contactSchema)

const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4],
  })

  if (process.argv.length == 5) {
    contact.save().then(result => {
      console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
      mongoose.connection.close()
    })
  }
  

  if (process.argv.length == 3) {
    Contact.find({}).then(result => {
      result.forEach(contact => {
        console.log(contact.name, contact.number)})
        mongoose.connection.close()
      })
  }

