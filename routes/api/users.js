const express = require('express');
const router = express.Router();

const crypto = require('crypto');
const axios = require('axios');
const randomString = require('crypto-random-string');
const querystring = require('querystring');

const { client_id, client_secret, redirect_uri, scopes } = require('../../config/keys');

// User Model
const User = require('../../models/User');
const cryptoRandomString = require('crypto-random-string');

let state;
let verifier;

// @route GET from Spotify
// @desc Try to log in user
// @access Private
router.get('/', async (req, res) => {
	// Create Code Challenge and State
	verifier = generateRandomString(50);
	const challenge = base64URLEncode(sha256(verifier));
	state = cryptoRandomString({ length: 16 });

	// Make request to Spotify
	res.redirect(
		'https://accounts.spotify.com/authorize?' +
			querystring.stringify({
				client_id             : client_id,
				response_type         : 'code',
				redirect_uri          : redirect_uri,
				code_challenge_method : 'S256',
				code_challenge        : challenge,
				scope                 : scopes,
				state                 : state
			})
	);
});

const generateRandomString = function(length) {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

function base64URLEncode(str) {
	return str.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function sha256(buffer) {
	return crypto.createHash('sha256').update(buffer).digest();
}

// @route GET from Spotify
// @desc Gets back authorization code and state from OAuth redirect and makes POST exchanging for token
// @access Private
router.get('/callback', async (req, res) => {
	const code = req.query.code || null;
	const returnedState = req.query.state || null;

	if (state === null || state !== returnedState) {
		res.redirect(
			'/#' +
				querystring.stringify({
					error : 'state_mismatch'
				})
		);
	}
	else {
		const requestBody = {
			client_id     : client_id,
			grant_type    : 'authorization_code',
			code          : code,
			redirect_uri  : redirect_uri,
			code_verifier : verifier
		};

		const config = {
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		};

		try {
			const spotifyRes = await axios.post(
				'https://accounts.spotify.com/api/token?',
				querystring.stringify(requestBody),
				config
			);
			const { access_token, refresh_token } = spotifyRes.data;
			res.redirect(
				'http://localhost:3000/' +
					querystring.stringify({
						access_token  : access_token,
						refresh_token : refresh_token
					})
			);
		} catch (error) {
			res.redirect(
				'/#' +
					querystring.stringify({
						error : 'invalid_token'
					})
			);
		}
	}
});

// @route POST api/users
// @desc Create A Post
// @access Private
router.post('/', async (req, res) => {
	const newUser = new User({
		id : req.body.id
	});

	user = await newUser.save();
	res.json(user);
});

// @route DELETE api/users
// @desc Delete A User
// @access Private
router.delete('/:id', async (req, res) => {
	try {
		await User.findById(req.params.id).deleteOne();
		res.json({ success: true });
	} catch (error) {
		res.status(404).json({ success: false });
	}
});

module.exports = router;
