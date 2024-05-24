// Dependencies
const mongoose = require('mongoose')
const express = require('express')
const contactsRouter = require('./controllers/contacts')
const cors = require('cors')
const {requestLogger} = require('./utils/middleware')
const {notFound, handleError} = require('./utils/middleware')
const {info} = require('./utils/logger')
const {MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV} = require('./utils/config')

// Connection to DB
const connectionString = NODE_ENV === 'production'
    ? MONGO_DB_URI
    : MONGO_DB_URI_TEST
info('Connecting to database ...')
mongoose.connect(connectionString)
    .then(() => info('Database Connected'))
    .catch(e => error(e))

// App configuration
const app =  express()
app.use(express.json())
app.use(cors())
app.use('/images', express.static('images'))
app.use(express.static('dist'))
app.use(requestLogger)
app.use('/api/contacts', contactsRouter)
app.use(notFound)
app.use(handleError)

module.exports = app