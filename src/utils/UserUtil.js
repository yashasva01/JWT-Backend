const jwt = require("jsonwebtoken");


const validateTokenUtils = (token) => {
    return jwt.verify(token, "SECRET_KEY");
}


module.exports = { validateTokenUtils };