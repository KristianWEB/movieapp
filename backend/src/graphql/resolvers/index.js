const usersResolvers = require("./users");
const Movie = require("../../models/Movie");
const movieResolvers = require("./movies");
const reviewResolvers = require("./reviews");

module.exports = {
  Movie: {
    rating: async parent => {
      const movie = await Movie.findById(parent.id).populate(
        "reviews",
        "stars"
      );
      let stars = 0;
      movie.reviews.forEach(review => {
        stars += Number(review.stars);
      });
      const rating = stars / movie.reviews.length;

      return Number(rating.toFixed(1));
    },
  },
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
