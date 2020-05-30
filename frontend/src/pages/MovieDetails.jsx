import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Row,
  Rate,
  Card,
  Col,
  Typography,
  Button,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import {
  GET_SINGLE_MOVIE,
  GET_REVIEWS_BY_MOVIE,
  CREATE_REVIEW,
  UPVOTE_REVIEW,
  DOWNVOTE_REVIEW,
} from "../utils/queries";
import "../App.less";
import { useParams } from "react-router-dom";
import { ReactComponent as ThumbsUp } from "../assets/thumbs-up.svg";
import { ReactComponent as ThumbsDown } from "../assets/thumbs-down.svg";
const { Title } = Typography;

const MovieDetails = () => {
  const { movieId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [reviewState, setReviewState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    body: "",
    stars: null,
  });

  const onChange = (e) =>
    setReviewState({ ...reviewState, [e.target.name]: e.target.value });

  const { data: movieData } = useQuery(GET_SINGLE_MOVIE, {
    variables: {
      movieId,
    },
  });
  const [createReview] = useMutation(CREATE_REVIEW, {
    variables: {
      firstName: reviewState.firstName,
      lastName: reviewState.lastName,
      email: reviewState.email,
      body: reviewState.body,
      stars: reviewState.stars,
      movieId,
    },
    onError: () => message.error("Something went wrong, please try again."),
    onCompleted: () =>
      message.success(
        "Review created successfully and it is now being reviewed by an administrator"
      ),
  });
  const [upvoteReview] = useMutation(UPVOTE_REVIEW);

  const [downvoteReview] = useMutation(DOWNVOTE_REVIEW);

  const { data: reviewsData } = useQuery(GET_REVIEWS_BY_MOVIE, {
    variables: {
      movieId,
    },
  });

  if (!movieData) {
    return null;
  }

  const { getSingleMovie: movie } = movieData;
  const handleSubmit = () => {
    createReview();
    setShowModal(false);
  };

  return (
    <>
      <Row
        justify="center"
        style={{
          paddingTop: "50px",
          marginBottom: "60px",
        }}
      >
        <Title>Movie details</Title>
      </Row>
      <Row justify="center">
        {movieData && (
          <>
            <Col span={12}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h1 style={{ marginBottom: "5px" }}>{movie.title}</h1>
                  <h2
                    style={{
                      marginBottom: "5px",
                      marginLeft: "20px",
                      backgroundColor: "#1890ff",
                      padding: "0 5px",
                      borderRadius: "4px",
                      color: "#fff",
                    }}
                  >
                    {movie.rating}
                  </h2>
                </div>
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
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                              }}
                            >
                              <h3
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginTop: "20px",
                                  lineHeight: "1",
                                  marginBottom: "0",
                                  marginRight: "15px",
                                }}
                              >
                                <ThumbsUp
                                  width={20}
                                  height={20}
                                  fill="#444"
                                  style={{
                                    marginRight: "5px",
                                  }}
                                />
                                {review.upvotes}
                              </h3>
                              <h3
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginTop: "20px",
                                  lineHeight: "1",
                                  marginBottom: "0",
                                }}
                              >
                                <ThumbsDown
                                  width={20}
                                  height={20}
                                  fill="#444"
                                  style={{
                                    marginRight: "5px",
                                  }}
                                />
                                {review.downvotes}
                              </h3>
                            </div>
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
                                onClick={() =>
                                  upvoteReview({
                                    variables: {
                                      reviewId: review.id,
                                    },
                                  })
                                }
                              >
                                Upvote
                              </Button>
                              <Button
                                type="dashed"
                                onClick={() =>
                                  downvoteReview({
                                    variables: {
                                      reviewId: review.id,
                                    },
                                  })
                                }
                              >
                                Downvote
                              </Button>
                            </div>
                          </div>
                        </Card>
                      )
                  )}
              </div>
            </Col>
            <Col col={6}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <img alt={movie.title} src={movie.poster} />
                <Button
                  type="primary"
                  style={{
                    marginTop: "20px",
                  }}
                  onClick={() => setShowModal(true)}
                >
                  Create a review
                </Button>
              </div>
            </Col>
          </>
        )}
      </Row>
      <Modal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <Form
          style={{
            width: "100%",
            marginTop: "30px",
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="First name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please enter your first name!",
              },
            ]}
          >
            <Input
              placeholder="Kristian"
              name="firstName"
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please enter your last name!",
              },
            ]}
          >
            <Input placeholder="Ivanov" name="lastName" onChange={onChange} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please enter your email!",
              },
            ]}
          >
            <Input
              placeholder="kristian@kristian.com"
              name="email"
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            label="Review"
            name="body"
            rules={[
              {
                min: 10,
                required: true,
                message: "Please enter your review!",
              },
            ]}
          >
            <Input.TextArea
              placeholder="Your review"
              name="body"
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            label="Rate"
            name="rate"
            rules={[
              {
                required: true,
                message: "Please enter your stars!",
              },
            ]}
          >
            <Rate
              onChange={(value) =>
                setReviewState({ ...reviewState, stars: value })
              }
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create review
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MovieDetails;
