const Url = require('./models/url');
const Redis = require('redis');

const Client = Redis.createClient();

Client.on('ready', ()=>{
	Client.flushall();
    Url.countDocuments({}, (err, c) => {
        Client.set('count', c);
    });
});

module.exports = Client;