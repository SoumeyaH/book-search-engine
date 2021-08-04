const { AuthenticationError } = require("apollo-server-express");

const { User } = require("../models");
const { signToken } = require("../utils/auth");

const signup = async (_, { input }) => {
  console.log("hello");
  const { username, email, password } = input;

  const user = await User.findOne({ email });

  console.log(user);

  if (!user) {
    const newUser = await User.create({ username, email, password });

    signToken({
      email: newUser.email,
      id: newUser._id,
      username: newUser.username,
    });

    return {
      token,
      user: newUser,
    };
  } else {
    throw new AuthenticationError("User already exists");
  }
};

module.exports = signup;