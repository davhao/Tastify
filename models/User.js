const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	short_term_tracks   : {
		type : Array
	},
	medium_term_tracks  : {
		type : Array
	},
	long_term_tracks    : {
		type : Array
	},
	short_term_artists  : {
		type : Array
	},
	medium_term_artists : {
		type : Array
	},
	long_term_artists   : {
		type : Array
	},
	date                : {
		type    : Date,
		default : Date.now
	}
});

module.exports = User = mongoose.model('user', UserSchema);
