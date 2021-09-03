const { AuthenticationError } = require("apollo-server-express");

const { User } = require("../models");

const getSingleUser = async (_, args, context) => {
  if (!context.user) {
    throw new AuthenticationError("Something went wrong");
  }

  const { _id } = context.user;

  const user = await User.findById(_id);

  return user;
};

module.exports = getSingleUser;
