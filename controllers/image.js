const Clarifai = require('clarifai');

const app = new Clarifai.App({
	apiKey: 'f790e60556ad45fa976c2b07bd71e596'
});

const handleApiCall = (req, res) => {
	app.models
		.predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => res.status(400).json('unable to work with API'));
};

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users')
		.where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then((entries) => {
			res.json(entries[0]);
		})
		.catch((err) => res.status(400).json('unable to get entries'));
};

module.exports = {
	handleImage,
	handleApiCall
};
