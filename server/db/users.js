const connection = require('./connection')

const {generateHash} = require('../auth/hash')

module.exports = {
  createUser
}

function createUser({username, password}, db = connection) {
  return generateHash(password)
    .then(hash => db('users').insert({username, hash}))
}