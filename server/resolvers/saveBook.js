const { AuthenticationError } = require("apollo-server-express");

const { User } = require("../models");

const saveBook = async (_, { input }, context) => {
  if (!context.user) {
    throw new AuthenticationError("Please login to save a book");
  }

  const { _id } = context.user;

  const user = await User.findByIdAndUpdate(
    _id,
    {
      $push: {
        savedBooks: input,
      },
    },
    { new: true }
  );

  return user;
};

module.exports = saveBook;
