const express = require('express')

const carsmakeController = require('../controller/carsmakeController');

const router = express.Router();


router.get('/api/cars', carsmakeController.make);


module.exports = router;