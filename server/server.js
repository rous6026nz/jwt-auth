const express = require('express')
const server = express()

const authRoutes = require('./routes/auth')

// Tell express how to process the body of the request messages.
server.use(express.json())

// Server route config.
server.use('/api/v1/auth', authRoutes)

module.exports = server