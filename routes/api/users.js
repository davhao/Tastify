const express = require('express');
const router = express.Router();

// User Model
const User = require('../../models/User');

// @route POST api/user
// @desc Post user's top songs
// @access Public
router.post('/', async (req, res) => {
	const newUser = new User({
		short_term_tracks   : req.body.short_term_tracks,
		medium_term_tracks  : req.body.medium_term_tracks,
		long_term_tracks    : req.body.long_term_tracks,
		short_term_artists  : req.body.short_term_artists,
		medium_term_artists : req.body.medium_term_artists,
		long_term_artists   : req.body.long_term_artists
	});

	user = await newUser.save();
	res.json(user);
});

router.get('/:id', async (req, res) => {
	try {
		const result = await User.findById(req.params.id);
		res.json({ result });
	} catch (err) {
		res.status(404).json({ success: false });
	}
});

module.exports = router;
