const path = require('path')

module.exports = {
    port: 3000,
    hostname: 'localhost',
    siteRoot: path.resolve(__dirname, '../../dist/swplanets'),
    siteRouters: path.resolve(__dirname, './site.routers.js')
}