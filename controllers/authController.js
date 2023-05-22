const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createToken = (id, name) => {
  return jwt.sign({ id, name }, "secret", { expiresIn: 7 * 60 * 60 * 24 });
};

const signup_get = (req, res) => {
  res.render("signup");
};

signup_post = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  const token = createToken(user._id, user.name);
  res.cookie("jwt", token, { httpOnly: true, maxAge: 7 * 60 * 60 * 24 * 1000 });
  res.json({ user: { id: user._id, name: user.name } });
};

const login_get = (req, res) => {
  res.render("login");
};

const login_post = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.login(email, password, next);
  console.log(user);
  const token = createToken(user._id, user.name);
  res.cookie("jwt", token, { httpOnly: true, maxAge: 7 * 60 * 60 * 24 * 1000 });
  res.json({ user: { id: user._id, name: user.name } });
};

const logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = { signup_get, login_get, signup_post, login_post, logout_get };
