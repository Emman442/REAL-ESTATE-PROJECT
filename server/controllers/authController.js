const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../utils/ErrorHandler");

exports.signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "user created Successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.Login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({
      email,
    });

    const validPassword = bcrypt.compare(password, validUser?.password || '');
    if (!validUser) {
      next(errorHandler(404, "Wrong Credential!"));
    }
    const token = jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie('access_token', token, {httpOnly: true}).status(200).json({validUser})
  } catch (error) {
    next(error);
  }
};
