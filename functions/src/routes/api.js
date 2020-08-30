const express = require('express')
const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })

const app = express()

const router = express.Router()

router.get('/', (req, res) => {
  res.send('none')
})

router.get('/one', (req, res) => {
  res.send('<h1>oneyyy/h1>')
})

router.get('/two', (req, res) => {
  res.send('two')
})

app.use('/api', router)

module.exports = functions.https.onRequest(router)
