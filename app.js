const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const indexRoutes = require("./routes/index");
const shortenerRoutes = require("./routes/shortener");

mongoose.connect('mongodb://localhost:27017/shortener', { useNewUrlParser: true });
// mongoose.connect('mongodb://localhost:27017/shortener', function () {
//     /* Drop the DB */
//     mongoose.connection.db.dropDatabase();
// });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

app.use(indexRoutes.routes);
app.use(shortenerRoutes.routes);

app.listen(3000, 'localhost', () => {
    console.log('Server is running.')
});