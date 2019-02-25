const Url = require('../models/url');

// exports.getAll = (req, res, next) => {
//     Url.find({})
//         .then(foundUrl => {
//             res.status(200).json({
//                 message: 'Get the original URL.',
//                 url: foundUrl
//             });
//         })
//         .catch(err => {
//             if (!err.statusCode) {
//                 err.statusCode = 500;
//             }
//             next(err);
//         });
// };

// Look up
exports.getShortURL = (req, res, next) => {
    console.log(req.params.id);
    Url.findOne({ shortURL: req.params.id })
        .then(foundUrl => {
            console.log(foundUrl);

            if (!foundUrl) {
                res.status(500).json({
                    message: 'No this URL.'
                });
            }
            else {
                res.redirect(foundUrl.longURL);
            }

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

// Insert
exports.postShortURL = (req, res, next) => {
    let originalURL = req.body.inputURL;
    let myShortURL = '';
    let exists = false;

    Url.find({ longURL: originalURL }, (err, foundUrl) => {
        if (err) {
            next(err);
        }
        if (foundUrl.length > 0) {
            return res.status(200).json({
                message: 'Duplicated URL.',
                shortURL: foundUrl[0].shortURL,
                longURL: originalURL
            });
        }
        else {
            Url.countDocuments({}, (err, c) => {
                if (err) {
                    next(err);
                }
                let alreadySaved = c;
            }).then(alreadySaved => {
                myShortURL = generateShortUrl(alreadySaved);
                return myShortURL;
            }).then(myShortURL => {
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
        }
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