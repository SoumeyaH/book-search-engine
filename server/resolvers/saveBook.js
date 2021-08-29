const saveBook = async (_, { input }, context) => {
  if (!context.user) {
    throw new AuthenticationError("Please login to save a book");
  }

  const { id } = context.user;

  const user = await User.findByIdAndUpdate(
    id,
    {
      $push: {
        savedBooks: input,
      },
    },
    { new: true }
  ).populate("savedBooks");

  return user;
};

module.export = saveBook;
