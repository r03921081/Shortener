const Url = require('../models/url');
const Client = require('../redis');

// Look up
exports.getShortURL = (req, res, next) => {
    let shortURL = req.params.id;
    Client.get(shortURL, (err, result) => {
        if (!err && result) {
            res.redirect(result);
        } else {
            Url.findOne({
                    shortURL: req.params.id
                })
                .then(foundUrl => {
                    if (!foundUrl) {
                        res.status(500).json({
                            message: 'URL Error.'
                        });
                    } else {
                        res.redirect(foundUrl.longURL);
                    }

                })
                .catch(err => {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }
                    next(err);
                });
        }
    });
};

// Insert
exports.postShortURL = (req, res, next) => {
    let originalURL = req.body.inputURL;
    Client.get('count', (err, c) => {
        if (err) {
            next(err);
        }
        let myShortURL = generateShortUrl(c);
        Client.set(myShortURL, originalURL);
        let newURL = {
            shortURL: myShortURL,
            longURL: originalURL
        }
        Url.create(newURL, (err) => {
            if (err) {
                res.status(500).json({
                    message: err
                });
            }
            res.status(200).json({
                message: "Create success.",
                shortURL: myShortURL,
                longURL: originalURL
            });
        });
    });
};

function generateShortUrl(alreadySaved) {
    let encode = [];

    for (let i = 0; i <= 9; i++) {
        encode.push(i);
    }
    for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
        encode.push(String.fromCharCode(i));
    }
    for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
        encode.push(String.fromCharCode(i));
    }

    if (alreadySaved == 0) {
        return '0';
    }

    let shortUrl = '';
    while (alreadySaved != 0) {
        shortUrl = encode[(alreadySaved % 62)] + shortUrl;
        alreadySaved = Math.floor(alreadySaved / 62);
    }
    return shortUrl;
}