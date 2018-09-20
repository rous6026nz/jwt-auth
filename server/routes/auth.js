const express = require('express')
const router = express.Router()

const {createUser} = require('../db/users')

// POST registration route.
router.post('/register', register)

function register(req, res) {
  const { username, password } = req.body
  createUser({username, password})
    .then(() => res.status(201).json({ok: true}))
    .catch(({message}) => {
      // This is vulnerable to changing databases. SQLite happens to use
      // this message, but Postgres doesn't.
      if(message.includes('UNIQUE constraint failed: users.username')) {
        return res.status(400).json({
          ok: false,
          message: 'Username already exists.'
        })
      }
      res.status(500).json({
        ok: false,
        message: 'Unknown error.'
      })
    })
}

module.exports = router