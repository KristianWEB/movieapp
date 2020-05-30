const { gql } = require("apollo-server");

module.exports = gql`
  type Admin {
    id: ID!
    email: String!
    token: String!
  }

  input ReviewInput {
    firstName: String!
    lastName: String!
    email: String!
    stars: Int!
    body: String!
    movieId: ID!
  }

  type MovieValue {
    id: ID!
    title: String!
  }

  type Review {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    stars: Int!
    body: String!
    approved: Boolean!
    movieId: MovieValue!
    upvotes: Int!
    downvotes: Int!
  }

  input MovieInput {
    title: String!
    year: String!
    released: String!
    runtime: String!
    genre: String!
    director: String!
    writer: String!
    actors: String!
    plot: String!
    language: String!
    country: String!
    awards: String!
    poster: String!
  }

  type Movie {
    id: ID!
    title: String!
    year: String!
    released: String!
    runtime: String!
    genre: String!
    director: String!
    writer: String!
    actors: String!
    plot: String!
    language: String!
    country: String!
    awards: String!
    poster: String!
    reviews: [Review]!
    rating: Float
  }

  type Query {
    loadAdmin: Admin!
    getMovies: [Movie]!
    getReviews: [Review]!
    getReviewsByMovie(movieId: ID!): [Review]!
    getSingleMovie(movieId: ID!): Movie!
  }

  type Mutation {
    register(email: String!, password: String!): Admin!
    login(email: String!, password: String!): Admin!
    createReview(reviewInput: ReviewInput): Review!
    createMovie(movieInput: MovieInput): Movie!
    approveReview(reviewId: ID!): Review!
    upvoteReview(reviewId: ID!): Review!
    downvoteReview(reviewId: ID!): Review!
    deleteReview(reviewId: ID!): Review!
  }
`;
