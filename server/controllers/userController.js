const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { errorHandler } = require("../utils/ErrorHandler");

exports.UpdateUserInfo = async (req, res, next) => {
    console.log(req.user._id);
  if (req.user._id !== req.params.id)
    return next(errorHandler(401, "You can only Update your own account"));

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, {
      $set: { username: req.body.username, email: req.body.email, avatar: req.body.avatar, password: req.body.password},
    }, {new: true});

    res.status(200).json({updatedUser})
  } catch (error) {
    console.log(error)
    next(error);
  }
};
