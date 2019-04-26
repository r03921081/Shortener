const Url = require('./models/url');
const Redis = require('redis');

const Client = Redis.createClient();

Client.on('ready', ()=>{
    Url.countDocuments({}, (err, c) => {
        Client.set('count', c);
    });
});

module.exports = Client;