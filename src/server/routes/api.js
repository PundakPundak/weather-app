const express = require('express')
const router = express.Router()
const City = require('../models/City')
const request = require(`request`)
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Cities', { useNewUrlParser: true })
//const moment = require('moment')
apiKey = `a8b3baa4c177dddc72284392a1ba0982`
apiRouteFirstPart = `http://api.openweathermap.org/data/2.5/weather?q=`
router.get('/city/:cityName', function(req,res){
    const cityName = req.params.cityName
    apiRoute = `${apiRouteFirstPart}${cityName}&appid=${apiKey}`
    request(apiRoute, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const result = JSON.parse(body) 
            // const newCity = new City ({
            //     name: result.name,
            //     temperature: result.main.temp,
            //     condition: result.weather[0].description, 
            //     conditionPic: `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png` 
            // })
            // City.find({ name: newCity.name }, function(err, foundCity) {
            //     if (!foundCity) {
            //             //newCity.save()
            //             res.send(newCity)
            //         }
            //     else {
            //             resultEmpty = null
            //             res.send({resultEmpty}) //()`${newCity.name} is allready in the database`) 
            //     }
            //})
            res.send(result)
        }
    }) 
})

router.get('/cities', function(req,res){
    City.find({}, function(err,cities){
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

router.delete('/city/:cityName', function(req,res){
    const cityName = req.params.cityName
    City.findOne({ name: cityName }, function (err, foundCity) {
        if (foundCity) {
            foundCity.remove(function (err) {
                console.log(err) //usually this will be `null`, unless something went wrong
            })
        }
    })
    res.end()
})
    // City.findOne({ name: cityName }).then().remove(function (err) {
    //                 if (err = `null`) { 
    //                     console.log(`${cityName} was deleted successfully!`) 
    //                     res.send(`${cityName} was deleted successfully!`)
    //                 }
    //                 else { 
    //                     console.log(err)
    //                     res.send(err)
    //                 }
    // })
    // City.findOne({ name: cityName }, function(err, foundCity) {
    //     if (foundCity)
    //     {
    //         foundCity.remove(function (err) {
    //             if (err = `null`) { 
    //                 console.log(`${cityName} was deleted successfully!`) 
    //                 res.send(`${cityName} was deleted successfully!`)
    //             }
    //             else { 
    //                 console.log(err)
    //                 res.send(err)
    //             }
    //         })
    //     }
    // })

router.put('/city/:cityName', function(req,res){
        const cityName = req.params.cityName
        apiRoute = `${apiRouteFirstPart}${cityName}&appid=${apiKey}`
        request(apiRoute, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const result = JSON.parse(body) 
                let cityToSave = new City({
                    name: result.name,
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