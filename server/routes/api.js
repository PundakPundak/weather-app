const express = require('express')
const router = express.Router()
const City = require('../model/Expense')
//const moment = require('moment')
apiKey = a8b3baa4c177dddc72284392a1ba0982

router.get('/City/:cityName', function(req,res){
    const cityName = req.params.cityName
    apiRoute = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    request(apiRoute, function(error, response, body) {

    })
})


module.exports = router