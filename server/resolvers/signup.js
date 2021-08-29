const { AuthenticationError } = require("apollo-server-express");

const { User } = require("../models");
const { signToken } = require("../utils/auth");

const signup = async (_, { input }) => {
  const { username, email, password } = input;

  const user = await User.findOne({ email });

  if (user) {
    throw new AuthenticationError("User already exists");
  }

  const newUser = await User.create(input);

  const token = signToken({
    id: newUser._id,
    email: newUser.email,
    username: newUser.username,
  });

  return {
    token,
    user: newUser,
  };
};

module.exports = signup;
