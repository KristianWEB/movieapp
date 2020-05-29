import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Row, Card, Rate, Button } from "antd";
import "../App.less";
import { GET_REVIEWS, APPROVE_REVIEW, DELETE_REVIEW } from "../utils/queries";

const Dashboard = () => {
  const { data: reviewsData } = useQuery(GET_REVIEWS);
  const [approveReview] = useMutation(APPROVE_REVIEW);
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

  return (
    <Row
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "30px",
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
