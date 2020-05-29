import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Card, Row, Col, Typography } from "antd";
import { GET_MOVIES } from "../utils/queries";
import "../App.less";
import { Link } from "react-router-dom";
const { Title } = Typography;

const Movies = () => {
  const { data: moviesData } = useQuery(GET_MOVIES);
  return (
    <>
      <Row
        justify="center"
        style={{
          marginBottom: "50px",
        }}
      >
        <Title>Movies app</Title>
      </Row>
      <Row gutter={40} justify="center">
        {moviesData &&
          moviesData.getMovies.map((movie) => (
            <Col span={3} key={movie.id}>
              <Link to={`movie/${movie.id}`}>
                <Card
                  hoverable
                  cover={<img alt={movie.title} src={movie.poster} />}
                  title={movie.title}
                />
              </Link>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Movies;
