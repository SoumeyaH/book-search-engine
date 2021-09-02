const { AuthenticationError } = require("apollo-server-express");

const { User } = require("../models");

const saveBook = async (_, { input }, context) => {
  console.log("here");
  if (!context.user) {
    throw new AuthenticationError("Please login to save a book");
  }

  const { _id } = context.user;

  console.log(context.user);
  const user = await User.findByIdAndUpdate(
    _id,
    {
      $push: {
        savedBooks: input,
      },
    },
    { new: true }
  );

  console.log(user);
  return user;
};

module.exports = saveBook;
