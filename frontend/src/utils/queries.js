import gql from "graphql-tag";

export const GET_MOVIES = gql`
  query {
    getMovies {
      id
      title
      year
      released
      runtime
      genre
      director
      writer
      actors
      plot
      language
      country
      awards
      poster
    }
  }
`;

export const GET_REVIEWS = gql`
  query {
    getReviews {
      id
      firstName
      lastName
      email
      stars
      approved
      body
      movieId {
        id
        title
      }
    }
  }
`;
export const GET_REVIEWS_BY_MOVIE = gql`
  query getReviewsByMovie($movieId: ID!) {
    getReviewsByMovie(movieId: $movieId) {
      id
      firstName
      lastName
      email
      stars
      body
      approved
      movieId {
        id
        title
      }
      upvotes
      downvotes
    }
  }
`;

export const GET_SINGLE_MOVIE = gql`
  query getSingleMovie($movieId: ID!) {
    getSingleMovie(movieId: $movieId) {
      id
      rating
      title
      year
      released
      runtime
      genre
      director
      writer
      actors
      plot
      language
      country
      awards
      poster
    }
  }
`;

export const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      token
    }
  }
`;

export const APPROVE_REVIEW = gql`
  mutation approveReview($reviewId: ID!) {
    approveReview(reviewId: $reviewId) {
      id
      firstName
      lastName
      email
      stars
      body
      approved
      movieId {
        id
        title
      }
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($reviewId: ID!) {
    deleteReview(reviewId: $reviewId) {
      id
      firstName
      lastName
      email
      stars
      body
      approved
      movieId {
        id
        title
      }
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview(
    $firstName: String!
    $lastName: String!
    $email: String!
    $stars: Int!
    $body: String!
    $movieId: ID!
  ) {
    createReview(
      reviewInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        stars: $stars
        body: $body
        movieId: $movieId
      }
    ) {
      id
      firstName
      lastName
      email
      stars
      body
      approved
      movieId {
        id
        title
      }
    }
  }
`;

export const UPVOTE_REVIEW = gql`
  mutation upvoteReview($reviewId: ID!) {
    upvoteReview(reviewId: $reviewId) {
      id
      upvotes
    }
  }
`;

export const DOWNVOTE_REVIEW = gql`
  mutation downvoteReview($reviewId: ID!) {
    downvoteReview(reviewId: $reviewId) {
      id
      downvotes
    }
  }
`;

export const LOAD_ADMIN = gql`
  {
    loadAdmin {
      email
      id
    }
  }
`;
