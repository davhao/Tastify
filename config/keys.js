module.exports = {
	mongoURI      : process.env.mongoURI,
	client_id     : process.env.client_id,
	client_secret : process.env.client_secret,
	redirect_uri  : `https://david-hao-tastify.herokuapp.com/api/login/callback`,
	scopes        : process.env.scopes
};
