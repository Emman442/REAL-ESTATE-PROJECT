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
  if (!email || !password) {
    next(errorHandler(400, "Please provide your credentials!"));
  }

  try {
    const validUser = await User.findOne({
      email,
    }).select("+password");

    if (!validUser)
      return next(
        errorHandler(404, "No user with these credential was found!")
      );

    const validPassword = bcrypt.compareSync(
      password,
      validUser?.password || ""
    );
    if (!validPassword) {
      return next(errorHandler(404, "Wrong Credential!"));
    }
    const token = jwt.sign(
      { _id: validUser._id || "" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res
      .cookie("access_token", token, { httpOnly: true, path: "/" })
      .status(200)
      .json({ validUser });
  } catch (error) {
    next(error);
  }
};
exports.google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res
        .cookie("access_token", token, { httpOnly: true, path: "/" })
        .status(200)
        .json({ user });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo
      });
      await newUser.save()
      cnsole.log(newUser)
       const token = jwt.sign(
         { _id: validUser?._id || "" },
         process.env.JWT_SECRET,
         {
           expiresIn: "1d",
         }
       );
       res
         .cookie("access_token", token, { httpOnly: true, path: "/" })
         .status(200)
         .json({ validUser });
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
};
