const express = require('express')
const router = express.Router()
const City = require('../models/City')
const request = require(`request`)
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/CitiesDB', { useNewUrlParser: true })

apiKey = `a8b3baa4c177dddc72284392a1ba0982`
apiRouteFirstPart = `http://api.openweathermap.org/data/2.5/weather?q=`

//GET CITY ROUTE
router.get('/city/:cityName', function(req,res){
    const cityName = req.params.cityName
    apiRoute = `${apiRouteFirstPart}${cityName}&appid=${apiKey}`
    request(apiRoute, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const result = JSON.parse(body) 
            res.send(result)
        }
    }) 
})

//GET CITIES ROUTE
router.get('/cities', function(req,res){
    City.find({}, function(err,cities){
        res.send(cities)
    })
})

//POST CITY ROUTE
router.post('/city', function(req,res){
    let cityToSave = new City({
        name: req.body.name,
        temperature: req.body.temperature,
        condition: req.body.condition,
        conditionPic: req.body.conditionPic
    })
    City.findOne({ name: cityToSave.name }, function(err, foundCity) {
        if (!foundCity) {
            cityToSave.save().then( function(city){
                    console.log(`${cityToSave.name} was added successfully!`)
                })
            }
        })
    res.send(`${cityToSave.name} was added successfully!`)
})

//DELETE CITY ROUTE
router.delete('/city/:cityName', function(req,res){
    const cityName = req.params.cityName
    City.findOne({ name: cityName }, function (err, foundCity) {
        if (foundCity) {
            foundCity.remove(function (err) {
                console.log(err) 
            })
        }
        res.send()
    })
})

//DELETE CITY ROUTE
router.put('/city/:cityName', function(req,res){
        const cityName = req.params.cityName
        apiRoute = `${apiRouteFirstPart}${cityName}&appid=${apiKey}`
        request(apiRoute, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const result = JSON.parse(body) 
                let cityToSave = new City({
                    name: result
                    .name,
                    temperature: result.temperature,
                    condition: result.condition,
                    conditionPic: result.conditionPic
                })
                City.findOne({ name: cityName },  function (err, foundCity) {
                    if (foundCity) {
                        foundCity.remove(function (err) {
                            console.log(err) //usually this will be `null`, unless something went wrong
                        })
                    }
                })
                cityToSave.save()
                res.send(result)
            }
        })
})

module.exports = router