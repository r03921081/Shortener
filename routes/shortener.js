const express = require('express');
const router = express.Router();
const shortenerController = require('../controllers/shortener');

// router.get('/all', shortenerController.getAll);
router.get('/:id', shortenerController.getShortURL);
router.post('/', shortenerController.postShortURL);

exports.routes = router;