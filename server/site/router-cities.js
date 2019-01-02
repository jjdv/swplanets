const fs = require('fs')

let cityList = [], cityListCompare = []
fs.readFile(__dirname + '/data/cities.GB-US-IE-PL.json', 'utf8', (err, data) => {
    if (err) return console.error(err)

    cityList = JSON.parse(data)
    cityListCompare = cityList.map(city => city.name.toLowerCase())
})

function matchingCities(startStr) {
    const firstIndex = cityListCompare.findIndex(city => city.startsWith(startStr))
    const matchLength = cityListCompare.slice(firstIndex).findIndex(city => !city.startsWith(startStr))
    return cityList.slice(firstIndex, firstIndex + matchLength)
}

const express = require('express')
const routerCities = express.Router()

routerCities.get('/', (req, res) => {
    if (typeof req.query.startStr === 'string') {
        res.set('Access-Control-Allow-Origin', '*')
        res.send(matchingCities(req.query.startStr.toLowerCase()))
    } else {
        res.send('startStr: ' + req.query.startStr)
    }
});

module.exports = {
    route: '/api/cities',
    handler: routerCities
}
