const { AuthenticationError } = require("apollo-server");
const Review = require("../../models/Review");
const Movie = require("../../models/Movie");
const getAuthenticatedUser = require("../middlewares/authenticated");

module.exports = {
  Query: {
    getReviews: async () => {
      try {
        const reviews = await Review.find({}).populate("movieId", "id title");
        return reviews;
      } catch (err) {
        throw new Error(err);
      }
    },
    getReviewsByMovie: async (_, { movieId }) => {
      try {
        const reviews = await Review.find({ movieId })
          .populate("movieId", "id title")
          .sort("-upvotes");
        return reviews;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createReview: async (
      _,
      { reviewInput: { firstName, lastName, email, stars, body, movieId } }
    ) => {
      try {
        //check if the user has a review for the same movie => if he does, then return null
        const review = await new Review({
          firstName,
          lastName,
          email,
          stars,
          body,
          movieId,
        })
          .save()
          .then(t => t.populate("movieId", "id title").execPopulate());

        return review;
      } catch (err) {
        throw new Error(err);
      }
    },
    approveReview: async (_, { reviewId }, context) => {
      const { user } = getAuthenticatedUser(context);
      if (!user) {
        throw new AuthenticationError("Unauthenticated!");
      }
      try {
        const review = await Review.findById(reviewId);
        const relatedMovie = await Movie.findById(review.movieId);

        await Review.findOneAndUpdate(
          {
            _id: review.id,
          },
          {
            approved: true,
          }
        );

        await Movie.findOneAndUpdate(
          {
            _id: relatedMovie.id,
          },
          {
            reviews: [review.id, ...relatedMovie.reviews],
          }
        );
        const populatedReview = await Review.findById(review.id).populate(
          "movieId",
          "title id"
        );

        return populatedReview;
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteReview: async (_, { reviewId }, context) => {
      const { user } = getAuthenticatedUser(context);
      if (!user) {
        throw new AuthenticationError("Unauthenticated!");
      }
      try {
        const review = await Review.findById(reviewId).populate(
          "movieId",
          "id title"
        );
        await review.delete();
        const relatedMovie = await Movie.findById(review.movieId);

        const newReviewsMovie = relatedMovie.reviews.filter(
          reviewId => reviewId.toString() !== review.id
        );

        await Movie.findOneAndUpdate(
          {
            _id: relatedMovie.id,
          },
          {
            reviews: newReviewsMovie,
          }
        );
        return review;
      } catch (err) {
        throw new Error(err);
      }
    },
    upvoteReview: async (_, { reviewId }) => {
      try {
        // since i don't know the user who's creating that ( no authentication on README.md ) i cannot check if he's already upvoted since I don't have any data related to the particular user.
        const review = await Review.findById(reviewId);
        await Review.findOneAndUpdate(
          {
            _id: review.id,
          },
          {
            upvotes: review.upvotes + 1,
          }
        );

        const populatedReview = await Review.findById(review.id).populate(
          "movieId",
          "title id"
        );
        return populatedReview;
      } catch (err) {
        throw new Error(err);
      }
    },
    downvoteReview: async (_, { reviewId }) => {
      try {
        // since i don't know the user who's creating that ( no authentication on README.md ) i cannot check if he's already downvoted since I don't have any data related to the particular user.
        const review = await Review.findById(reviewId);
        const newReview = await Review.findOneAndUpdate(
          {
            _id: review.id,
          },
          {
            downvotes: review.downvotes + 1,
          }
        );
        const populatedReview = await Review.findById(review.id).populate(
          "movieId",
          "title id"
        );

        return populatedReview;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
