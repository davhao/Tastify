module.exports = {
	mongoURI      : process.env.mongoURI,
	client_id     : process.env.client_id,
	client_secret : process.env.client_secret,
	redirect_uri  : `http://www.tastify.io/api/login/callback`,
	scopes        : process.env.scopes,
	url           : `http://www.tastify.io`
};
