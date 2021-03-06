'use strict'

const { Router } = require('express')
const bcrypt = require('bcrypt')
const router = Router()
const User = require('../models/user')

router.get('/currentUserObj', (req, res, err) => {
	User
		.findOne({ username: req.session.username })
		.then((user) => {
			res.json(user)
		})
})

router.post('/login', ({ session, body: { username, password } }, res, err) => {
	User.findOne({ username })
		.then(user => {
			if (user) {
				return new Promise((resolve, reject) => {
					bcrypt.compare(password, user.password, (err, matches) => {
						if (err) {
							reject(err)
						} else {
							resolve(user)
						}
					})
				})
			} else {
				res.json({ msg: 'User name does not exist in our system' })
			}
		})
		.then((user) => {
			if (user) {
				session.username = username
				res.json({user: user.username})
			} else {
				res.json({ msg: 'Password does not match' })
			}
		})
		.catch(err)
})

router.post('/register', ({ body: { username, email, password, location, species, seeking, description, confirmation } }, res, err) => {
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
			.then(hash => User.create({ username, email, password: hash, location, species, seeking, description }))
			.then(() => res.json({ msg: 'User created' }))
			.catch(err)
	} else {
		res.json({ msg: "Password & password confirmation do not match" })
	}
})

// login guard middleware
//above all login routes
// router.use((req, res, next) => {
// 	if (req.session.username) {
// 		next()
// 	} else {
// 		res.status(400).send({ code: 400, status: 'No current sesssion - please login' })
// 	}
// })

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

router.put('/api/updatelike/:username', (req, res, err) => {
	const Username = req.params.username
	const updateLikes = req.body
	User
		.findOneAndUpdate({ username: Username }, { $set: { likedusers: updateLikes } })
		.then(user => {
			res.json(user)
		})
		.catch(err)
})


//Destroy current users session
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err
  });
});

module.exports = router
