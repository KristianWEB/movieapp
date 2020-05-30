import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Redirect } from "react-router-dom";
import { Row, Card, Rate, Button } from "antd";
import "../App.less";
import {
  GET_REVIEWS,
  APPROVE_REVIEW,
  DELETE_REVIEW,
  LOAD_ADMIN,
  GET_REVIEWS_BY_MOVIE,
} from "../utils/queries";

const Dashboard = () => {
  const { data: adminData, loading } = useQuery(LOAD_ADMIN);
  const { data: reviewsData } = useQuery(GET_REVIEWS, {
    fetchPolicy: "network-only",
  });
  const [approveReview] = useMutation(APPROVE_REVIEW, {
    update: (proxy, { data: { approveReview } }) => {
      const data = proxy.readQuery({
        query: GET_REVIEWS_BY_MOVIE,
        variables: {
          movieId: approveReview.movieId.id,
        },
      });
      const newData = {
        getReviewsByMovie: [approveReview, ...data.getReviewsByMovie],
      };
      proxy.writeQuery({
        query: GET_REVIEWS_BY_MOVIE,
        variables: {
          movieId: approveReview.movieId.id,
        },
        data: newData,
      });
    },
  });
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    update: (proxy, { data: { deleteReview } }) => {
      const data = proxy.readQuery({
        query: GET_REVIEWS,
      });
      const newData = data.getReviews.filter(
        (review) => review.id !== deleteReview.id
      );
      proxy.writeQuery({
        query: GET_REVIEWS,
        data: { getReviews: newData },
      });
    },
  });
  if (!loading) {
    if (!adminData) {
      return <Redirect to="/admin/login" />;
    }
  }

  return (
    <Row
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "40px",
        flexDirection: "column",
      }}
    >
      {reviewsData &&
        reviewsData.getReviews.map(
          (review) =>
            !review.approved && (
              <Card
                title={`${review.firstName} ${review.lastName} reviewed "${review.movieId.title}"`}
                key={review.id}
                style={{ marginTop: "15px" }}
              >
                <span style={{ marginRight: "15px" }}>{review.body}</span>{" "}
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
                    onClick={() =>
                      approveReview({
                        variables: {
                          reviewId: review.id,
                        },
                      })
                    }
                  >
                    Approve
                  </Button>
                  <Button
                    type="dashed"
                    onClick={() =>
                      deleteReview({
                        variables: {
                          reviewId: review.id,
                        },
                      })
                    }
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            )
        )}
    </Row>
  );
};

export default Dashboard;
