const { Ignitor } = require('@adonisjs/ignitor')
const https = require('https')
const fs = require('fs')

// Certificate
if (process.env.NODE_ENV == 'production') {
  const options = {
    key: fs.readFileSync(process.env.HTTPS_KEY),
    cert: fs.readFileSync(process.env.HTTPS_CERT),
  }

  new Ignitor(require('@adonisjs/fold'))
    .appRoot(__dirname)
    .fireHttpServer(handler => {
      return https.createServer(options, handler)
    })
    .catch(console.error)
} else {
  new Ignitor(require('@adonisjs/fold'))
    .appRoot(__dirname)
    .fireHttpServer()
    .catch(console.error)
}
