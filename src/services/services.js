const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../models');

const newUserHandler = (username, password) => {
    if (!username || !password) {
        return { status: 400, message: 'Username and password are required' };
    }
    bcrypt.hash(password, 10, async function(err, hash) {
        if (err) {
            return { status: 500, message: 'Error hashing password' };
        }
        await db.User.create({ username: username, password: hash });
    });
    return { status: 201, message: 'User created' };
}

const loginUserHandler = async (username, password) => {
    if (!username || !password) {
        return { status: 400, message: 'Username and password are required' };
    }

    const user = await db.User.findOne({ where: { username: username },raw: true });
    if (!user) {
        return { status: 404, message: 'User not found' };
    }
    //console.log(user);
    const userPassword = user.password;
    const isMatch = bcrypt.compare(password, userPassword, function(err, result) {
        if (err) {
            return err;
        } 
        return result;
    });
    if (isMatch instanceof Error) {
        return { status: 401, message: 'Password is incorrect' };
    }
    // User Logged In 
    //generate jwt webtoken 
    const token = jwt.sign({ username }, 'SECRET_KEY' , {
        expiresIn: 3600,
    });
    return { status: 200, message: 'User logged in', token: token}
};

module.exports = { newUserHandler, loginUserHandler };