'use strict'

const { Router } = require('express')
const bcrypt = require('bcrypt')

const router = Router()
const User = require('../models/user')
// const TestUser = require('../models/testuser')

router.get('/', (req, res) =>
  res.render('index')
)


router.get('/api/allusers', (req, res, err) => {
  User
  .find()
  .then(users => res.json(users))
  .catch(err)
})


router.get('/api/:username', (req, res, err) => {
  const Username = req.params.username
  User
  .findOne({ username: Username })
  .then(user =>
  res.json(user))
  .catch(err)
})

router.put('/api/like/:username/:likedusername', (req, res, err) => {
  const Username = req.params.username
  const LikedUser = req.params.likedusername
  console.log("USERNAME, LIKEDUSER", Username, LikedUser)
  User
  .findOneAndUpdate({ username: Username }, { $push: { likedusers: LikedUser }})
  .then(user =>
  res.json(user))
  .catch(err)
})


router.put('/api/dislike/:username/:dislikedusername', (req, res, err) => {
  const Username = req.params.username
  const DislikedUser = req.params.dislikedusername
  console.log("USERNAME, LIKEDUSER", Username, DislikedUser)
  User
  .findOneAndUpdate({ username: Username }, { $push: { dislikedusers: DislikedUser }})
  .then(user =>
  res.json(user))
  .catch(err)
})


router.get('/login', (req, res) =>
  res.render('login')
)

router.post('/login', ({ session, body: { email, password } }, res, err) => {
  User.findOne({ email })
    .then(user => {
      if (user) {
        return new Promise((resolve, reject) => {
          bcrypt.compare(password, user.password, (err, matches) => {
            if (err) {
              reject(err)
            } else {
              resolve(matches)
            }
          })
        })
      } else {
        res.render('login', { msg: 'Email does not exist in our system' })
      }
    })
    .then((matches) => {
      if (matches) {
        session.email = email
        res.redirect('/')
      } else {
        res.render('login', { msg: 'Password does not match' })
      }
    })
    .catch(err)
})

router.get('/register', (req, res) =>
  res.render('register')
)

router.post('/register', ({ body: { email, password, confirmation } }, res, err) => {
  if (password === confirmation) {
    User.findOne({ email })
      .then(user => {
        if (user) {
          res.render('register', { msg: 'Email is already registered' })
        } else {
          return new Promise((resolve, reject) => {
            bcrypt.hash(password, 15, (err, hash) => {
              if (err) {
                reject(err)
              } else {
                resolve(hash)
              }
            })
          })
        }
      })
      .then(hash => User.create({ email, password: hash }))
      .then(() => res.redirect('/login'), { msg: 'User created' })
      .catch(err)
  } else {
    res.render('register', { msg: 'Password & password confirmation do not match' })
  }
})

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err
    res.redirect('/login')
  })
})


// login guard middleware
router.use((req, res, next) => {
  if (req.session.email) {
    next()
  } else {
    res.redirect('/login')
  }
})

router.get('/logout', (req, res) =>
  res.render('logout', { page: 'Logout'})
)

module.exports = router
