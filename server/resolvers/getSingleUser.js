const { AuthenticationError } = require("apollo-server-express");

const { User } = require("../models");

const getSingleUser = async (_, args, context) => {
  if (!context.user) {
    throw new AuthenticationError("Something went wrong");
  }

  const { _id } = context.user;

  console.log("context", context.user);

  const user = await User.findById(_id);

  console.log("user", user);

  return user;
};

module.exports = getSingleUser;
