module.exports = {
	mongoURI      : process.env.mongoURI,
	client_id     : process.env.client_id,
	client_secret : process.env.client_secret,
	redirect_uri  : `http://tastify.io/api/login/callback`,
	scopes        : process.env.scopes,
	url           : `http://tastify.io`
};

// module.exports = {
// 	mongoURI      :
// 		'mongodb+srv://DavidHao:Henniker2001@spotifytastecomparison.qunp7.mongodb.net/top_songs?retryWrites=true&w=majority',
// 	client_id     : '652968a58f81490ebef5a65f83464a55',
// 	client_secret : '5ec687ef5fcf4924a2129b79411f9df0',
// 	redirect_uri  : `http://localhost:5000/api/login/callback`,
// 	scopes        : 'user-top-read',
// 	url           : 'http://localhost:3000'
// };
