const path = require('path')
const fs = require('fs')
const express = require('express')
const routerSpa = express.Router()

const routes = /\/(list|planet\/\d{1,2})?/
const file = 'index.html'

const {siteRoot} = require('./site.config.js')
const  filePath = path.resolve(siteRoot, file)

routerSpa.get('/', (req, res) => {
    if (fs.existsSync(filePath)) res.sendFile(filePath)
    else {
        res.sendStatus(404)
    }
});

module.exports = {
    route: routes,
    handler: routerSpa
}
