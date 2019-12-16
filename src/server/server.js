const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('../server/routes/api')
const path = require('path')
// const request = require(`request`)

// Mongoose setup
// const mongoose = require('mongoose')
// const City = require('../server/models/City')
// mongoose.connect('mongodb://localhost/Cities', { useNewUrlParser: true })

//Dist and node_modules
app.use(express.static(path.join(__dirname, '..', '..', 'dist')))
app.use(express.static(path.join(__dirname, '..', '..', 'node_modules')))
//
console.log(__dirname)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use( '/', api )



const port = 3000
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})