const express = require('express')
const verifyJwt = require('express-jwt')

const token = require('../auth/token')
const {createUser, getUser} = require('../db/users')

const router = express.Router()

router.post(
  '/register',
  register,
  token.issue
)

router.get(
  '/user',
  verifyJwt({ secret: process.env.JWT_SECRET }),
  user
)

router.use(userError)

function register (req, res, next) {
  const { username, password } = req.body
  createUser({ username, password })
    .then(([ id ]) => {
      res.locals.userId = id
      next()
    })
    .catch(({ message }) => {
      // Fairly blunt error checking.
      if (message.includes('UNIQUE constraint failed: users.username')) {
        return res.status(400).json({ ok: false, message: 'Username already exists.' })
      }
      res.status(500).json({ ok: false, message: "Something bad happened. We don't know why." })
    })
}

function user (req, res) {
  getUser(req.user.id)
    .then(({ username }) =>
      res.json({
        ok: true,
        username
      }))
    .catch(e =>
      res.status(500).json({
        ok: false,
        message: 'An error ocurred while retrieving your user profile.'
      }))
}

function userError (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ ok: false, message: 'Access denied.' })
  }
}

module.exports = router