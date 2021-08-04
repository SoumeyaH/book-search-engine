const { AuthenticationError } = require("apollo-server-express");

const { User } = require("../models");

const login = async (_, { input }) => {
  const { email, password } = input;

  const user = await User.findOne({ email }).populate("savedBooks");

  if (!user) {
    throw new AuthenticationError("User not found");
  }

  const validPassword = user.isCorrectPassword(password);

  if (!validPassword) {
    throw new AuthenticationError("Password Invalid");
  }

  const token = signToken({
    id: user._id,
    email: user.email,
    username: user.username,
  });

  return {
    token,
    user,
  };
};

module.exports = login;
