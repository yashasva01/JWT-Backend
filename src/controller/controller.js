const services = require('../services/services');
const jwt = require('jsonwebtoken');

const createNewUser = async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    const {status, message} = await services.newUserHandler(username, password);
    res.status(status).json(message);
};


const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const {status, message, token} = await services.loginUserHandler(username, password);
    res.status(status).json({message, token});
};

const validateUser = async (req, res) => {
    const token = req.body.token;
    if (!token) {
        res.status(401).json({message: 'Token is required'});
    }
    try {
        const decoded = jwt.verify(token, 'SECRET_KEY');
        res.status(200).json({message: 'Token is valid'});
    } catch (err) {
        res.status(401).json({message: 'Token is invalid'});
    }
}

module.exports = { createNewUser, loginUser, validateUser };