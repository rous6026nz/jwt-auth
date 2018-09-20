require('dotenv').config()
const server = require('./server')

server.listen(3000, () => console.log('Listening on port 3 zip!'))