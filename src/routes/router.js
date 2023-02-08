const express = require('express');
const controller = require('../controller/controller');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('this is user api for todo service');
});

router.post('/users', controller.createNewUser);

router.post('/users/login', controller.loginUser);

router.post('/users/validate', controller.validateUser);

module.exports = router;