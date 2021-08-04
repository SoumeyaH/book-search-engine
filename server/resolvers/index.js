const login = require("./login");
const signup = require("./signup");
const saveBook = require("./saveBook");
const removeBook = require("./removeBook");
const getSingleUser = require("./getSingleUser");

console.log(login);
console.log(signup);

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

console.log(resolvers);

module.exports = resolvers;
