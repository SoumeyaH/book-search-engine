const login = require("./login");
const signup = require("./signup");
const saveBook = require("./saveBook");
const removeBook = require("./removeBook");
const getSingleUser = require("./getSingleUser");

const resolvers = {
  Query: {
    me: getSingleUser,
  },
  Mutation: {
    login,
    signup,
    saveBook,
    removeBook,
  },
};

module.exports = resolvers;
