'use strict'

const mongoose = require('mongoose')


module.exports = mongoose.model('user', {
      species: String,
      seeking: String,
      username: String,
      email: String,
      password: String,
      description: String,
      location: String,
      likedusers: Array,
      dislikedusers: Array
})
