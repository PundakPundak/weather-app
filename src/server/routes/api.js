const express = require('express')
const router = express.Router()
const City = require('../models/City')
const request = require(`request`)
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Cities', { useNewUrlParser: true })
//const moment = require('moment')
apiKey = `a8b3baa4c177dddc72284392a1ba0982`

router.get('/city/:cityName', function(req,res){
    const cityName = req.params.cityName
    apiRoute = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    request(apiRoute, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const result = JSON.parse(body) 
            const newCity = new City ({
                name: result.name,
                temperature: result.main.temp,
                condition: result.weather[0].description, 
                conditionPic: result.weather[0].icon 
            })
            console.log(newCity)
            City.findOne({ name: newCity.name }, function(err, foundCity) {
                if (!foundCity) {
                        newCity.save()
                        res.send(newCity)
                    }
                else {
                        res.end() //()`${newCity.name} is allready in the database`) 
                }
            })
        }
    }) 
})

router.get('/cities', function(req,res){
    City.find( function(err,cities){
        res.send(cities)
    })
})

// {
//     "name": "London",
//     "temperature": 270
//     "condition": "light intensity drizzle",
//     "icon": "09d"
// }
router.post('/city', function(req,res){
    let newCity = new City({
        name: req.body.name,
        temperature: req.body.temperature,
        condition: req.body.condition,
        conditionPic: req.body.conditionPic
    })
    City.findOne({ name: newCity.name }, function(err, foundCity) {
        if (!foundCity) {
                newCity.save().then( function(city){
                    console.log(`${city.name} was added successfully!`)
                })
            }
        })
    res.send(`${city.name} was added successfully!`)
})

router.delete('/city/:cityName', function(req,res){
    const cityName = req.params.cityName
    let newCity = new City()
    City.findOne({ name: cityName }, function(err, foundCity) {
        foundCity.remove(function (err) {
            if (err = `null`) { 
                console.log(`${cityName} was deleted successfully!`) 
                res.send(`${cityName} was deleted successfully!`)
            }
            else { 
                console.log(err)
                res.send(err)
             }
        })
    })
})

module.exports = router