const services = require("../services/services");

const createNewUser = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const { status, message } = await services.newUserHandler(username, password);
  res.status(status).json(message);
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const { status, message, token } = await services.loginUserHandler(
    username,
    password
  );
  res.status(status).json({ message, token });
};

const validateUser = async (req, res) => {
  const token = req.body.token;
  const { status, message } = await services.validateUserHandler(token);
  res.status(status).json(message);
};

module.exports = { createNewUser, loginUser, validateUser };
