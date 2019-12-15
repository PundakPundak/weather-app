const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('../server/routes/api')
const path = require('path')
// const request = require(`request`)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use( '/', api )
//Dist and node_modules
app.use(express.static(path.join(__dirname, '..', 'dist')))
app.use(express.static(path.join(__dirname, '..', 'node_modules')))
//
// Mongoose setup
// const mongoose = require('mongoose')
// const City = require('./server/model/City')
// mongoose.connect('mongodb://localhost/Cities', { useNewUrlParser: true })

const port = 3000
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})