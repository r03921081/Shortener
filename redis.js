const Url = require('./models/url');
const Redis = require('redis');

const Client = Redis.createClient();

Url.countDocuments({}, (err, c) => {
    Client.set('count', c);
});

module.exports = Client;