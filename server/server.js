const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const path = require("path");

const { authMiddleware } = require("./utils/auth");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const db = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
};

startServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

db.once("open", () => {
  app.listen(PORT, () =>
    console.log(`Use GraphQL at localhost:${PORT}${server.graphqlPath}`)
  );
});
