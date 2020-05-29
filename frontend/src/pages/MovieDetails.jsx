import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Row, Rate, Card, Col, Typography, Button } from "antd";
import { GET_SINGLE_MOVIE, GET_REVIEWS_BY_MOVIE } from "../utils/queries";
import "../App.less";
import { useParams } from "react-router-dom";
const { Title } = Typography;

const MovieDetails = () => {
  const { movieId } = useParams();

  const { data: movieData } = useQuery(GET_SINGLE_MOVIE, {
    variables: {
      movieId,
    },
  });
  const { data: reviewsData } = useQuery(GET_REVIEWS_BY_MOVIE, {
    variables: {
      movieId,
    },
  });

  if (!movieData) {
    return null;
  }

  const { getSingleMovie: movie } = movieData;

  return (
    <>
      <Row
        justify="center"
        style={{
          marginTop: "15px",
          marginBottom: "50px",
        }}
      >
        <Title>Movie details</Title>
      </Row>
      <Row justify="center">
        {movieData && (
          <>
            <Col span={12}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h1 style={{ marginBottom: "5px" }}>{movie.title}</h1>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <p className="movieDetails-paragraph">
                    Year:{" "}
                    <span style={{ fontWeight: "500" }}> {movie.year}</span>
                  </p>
                  <p className="movieDetails-paragraph">
                    Released:
                    <span style={{ fontWeight: "500" }}> {movie.released}</span>
                  </p>
                  <p className="movieDetails-paragraph">
                    Runtime:
                    <span style={{ fontWeight: "500" }}> {movie.runtime}</span>
                  </p>
                  <p className="movieDetails-paragraph">
                    Genre:
                    <span style={{ fontWeight: "500" }}> {movie.genre}</span>
                  </p>
                  <p className="movieDetails-paragraph">
                    Director:
                    <span style={{ fontWeight: "500" }}> {movie.director}</span>
                  </p>
                  <p className="movieDetails-paragraph">
                    Writer:
                    <span style={{ fontWeight: "500" }}> {movie.writer}</span>
                  </p>
                  <p className="movieDetails-paragraph">
                    Actors:
                    <span style={{ fontWeight: "500" }}> {movie.actors}</span>
                  </p>
                </div>
              </div>
              <p className="movieDetails-body">{movie.plot}</p>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <p className="movieDetails-paragraph">
                  Language:
                  <span style={{ fontWeight: "500" }}> {movie.language}</span>
                </p>
                <p className="movieDetails-paragraph">
                  Country:
                  <span style={{ fontWeight: "500" }}> {movie.country}</span>
                </p>
                <p className="movieDetails-paragraph">
                  Awards:
                  <span style={{ fontWeight: "500" }}> {movie.awards}</span>
                </p>
              </div>
              <div style={{ marginTop: "15px" }}>
                <Title level={3}>Reviews</Title>
                {reviewsData &&
                  reviewsData.getReviewsByMovie.map(
                    (review) =>
                      review.approved && (
                        <Card
                          title={`${review.firstName} ${review.lastName} `}
                          key={review.id}
                          style={{ width: "50%", marginTop: "20px" }}
                        >
                          <span style={{ marginRight: "15px" }}>
                            {review.body}
                          </span>{" "}
                          <Rate disabled defaultValue={review.stars} />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              marginTop: "20px",
                            }}
                          >
                            <Button
                              type="primary"
                              style={{ marginRight: "10px" }}
                            >
                              Upvote
                            </Button>
                            <Button type="dashed">Downvote</Button>
                          </div>
                        </Card>
                      )
                  )}
              </div>
            </Col>
            <Col col={6}>
              <img alt={movie.title} src={movie.poster} />
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

export default MovieDetails;
