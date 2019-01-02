const path = require('path')
const fs = require('fs')

const confFileName = 'site.config.js'
const dirs = ['.', './site', './config']
const rootDir = process.cwd()

function exitNoConfig(confPath = null) {
  const searchedDirs = confPath ? ("the dir: '" + confPath + "'") : ("any of the dirs: '" + dirs.join("', '") + "'")
  console.log(`Sorry, no server config file '${confFileName}' found in ${searchedDirs}.`)
  process.exit(9)
}

let confPath
if (process.argv.length > 2) {
    const confDir = process.argv[2]
    confPath = path.resolve(rootDir, confDir, confFileName)
    if (!fs.existsSync(confPath)) exitNoConfig(confDir)
} else {
    let notFound = true
    for (let i=0; i<dirs.length; i++) {
        confPath = path.resolve(__dirname, dirs[i], confFileName)
        if (fs.existsSync(confPath)) {
            notFound = false
            break
        }
    }
    if (notFound) exitNoConfig()
}
const siteConfig = require(confPath)

module.exports = siteConfig
