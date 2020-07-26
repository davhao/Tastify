const express = require('express');
const router = express.Router();

// User Model
const User = require('../../models/User');

// @route POST api/user
// @desc Post user's top songs
// @access Public
router.post('/', async (req, res) => {
	const newUser = new User({
		songs : req.body.songs
	});

	user = await newUser.save();
	res.json(user);
});

module.exports = router;
