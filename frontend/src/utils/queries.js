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
    }
  }
`;

export const GET_SINGLE_MOVIE = gql`
  query getSingleMovie($movieId: ID!) {
    getSingleMovie(movieId: $movieId) {
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
