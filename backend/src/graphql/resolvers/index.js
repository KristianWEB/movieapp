const usersResolvers = require("./users");
const movieResolvers = require("./movies");
const reviewResolvers = require("./reviews");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...movieResolvers.Query,
    ...reviewResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...movieResolvers.Mutation,
    ...reviewResolvers.Mutation,
  },
};
