const Movie = require("../../models/Movie");

module.exports = {
  Query: {
    getMovies: async () => {
      try {
        const movies = await Movie.find({});
        return movies;
      } catch (err) {
        throw new Error(err);
      }
    },
    getSingleMovie: async (_, { movieId }) => {
      try {
        const movie = await Movie.findById(movieId);

        return movie;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createMovie: async (
      _,
      {
        movieInput: {
          title,
          year,
          released,
          runtime,
          genre,
          director,
          writer,
          actors,
          plot,
          language,
          country,
          awards,
          poster,
        },
      }
    ) => {
      try {
        const movie = new Movie({
          title,
          year,
          released,
          runtime,
          genre,
          director,
          writer,
          actors,
          plot,
          language,
          country,
          awards,
          poster,
        }).save();

        return movie;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
