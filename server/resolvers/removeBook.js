const { AuthenticationError } = require("apollo-server-express");

const { User } = require("../models");

const removeBook = async (_, { bookId }, context) => {
  if (!context.user) {
    throw new AuthenticationError("Please login to delete a book");
  }

  const { _id } = context.user;
  console.log("context", context.user);

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      $pull: {
        savedBooks: { bookId },
      },
    },
    { new: true }
  );

  console.log("updatedUser", updatedUser);

  return updatedUser;
};

module.exports = removeBook;
