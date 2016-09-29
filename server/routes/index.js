'use strict'

const { Router } = require('express')
const bcrypt = require('bcrypt')

const router = Router()
const User = require('../models/user')
// const TestUser = require('../models/testuser')

// router.get('/', (req, res) =>
//   res.render('index')
// )


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


// router.get('/login', (req, res) =>
//   res.render('login')
// )

router.post('/login', ({ session, body: { username, password } }, res, err) => {
	User.findOne({ username })
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
				res.json({ msg: 'User name does not exist in our system' })
			}
		})
		.then((matches) => {
			if (matches) {
				session.username = username
				// res.redirect('/')
			} else {
				res.json({ msg: 'Password does not match' })
			}
		})
		.catch(err)
})

// router.get('/register', (req, res) =>
//   res.render('register')
// )

router.post('/register', ({ body: { username, password, confirmation } }, res, err) => {
	if (password === confirmation) {
		User.findOne({ username })
			.then(user => {
				if (user) {
					res.json({ msg: 'User is already registered' })
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
			.then(hash => User.create({ username, password: hash }))
			.then(() => res.json({ msg: 'User created' }))
			.catch(err)
	} else {
		res.json({ msg: "Password & password confirmation do not match" })
	}
})

// router.post('/logout', (req, res) => {
//   req.session.destroy(err => {
//     if (err) throw err
//     res.redirect('/login')
//   })
// })


// login guard middleware
router.use((req, res, next) => {
	if (req.session.username) {
		next()
	} else {
		rres.status(400).send({ code: 400, status: 'No current sesssion - please login' })
	}
})

// router.get('/logout', (req, res) =>
//   res.render('logout', { page: 'Logout'})
// )

module.exports = router
