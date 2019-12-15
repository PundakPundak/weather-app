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
            City.findOne({ name: newCity.name }, function(err, foundCity) {
                if (!foundCity) {
                        newCity.save()
                    }
                })
        }
    res.send(response)    
    }) 
})
module.exports = router