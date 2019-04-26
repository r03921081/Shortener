const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();

const shortenerRoutes = require("./routes/shortener");

mongoose.connect('mongodb://localhost:27017/shortener', { useNewUrlParser: true });
// mongoose.connect('mongodb://localhost:27017/shortener', function () {
//     /* Drop the DB */
//     mongoose.connection.db.dropDatabase();
// });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('short'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

app.use(shortenerRoutes.routes);

app.listen(3000);