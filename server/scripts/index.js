require('babel-register')

const args = process.argv.slice(2)

require(`./${args[0]}.js`)
