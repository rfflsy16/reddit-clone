
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()

const router = require('./routers/index.js')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)

module.exports = app