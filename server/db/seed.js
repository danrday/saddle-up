'use strict'

const { connect, disconnect } = require('./database')

const User = require('../models/user')
const users = require('./userSeed')


connect()
  .then(() => User.remove({}))
  .then(() => User.insertMany(users))
  .then(disconnect)
  .catch(console.error)
