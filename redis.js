const Url = require('./models/url');
const redis = require('redis');

const client = redis.createClient();

client.on('ready', (err)=>{
    console.log('Redis ready.');
    Url.countDocuments({}, (err, c) => {
        if (err) {
            next(err);
        }
        console.log('redis ', c);
        client.set('count', c);
    })
    .then(() => {
    	client.get('count', (err, r) => {
	    	console.log('count: ' + r);
	    });
    });
});

module.exports = client;