import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import { Menu } from "antd";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

const Routes = () => {
  return (
    <>
      <Router>
        <Menu
          theme="light"
          mode="horizontal"
          style={{
            display: "flex",
            justifyContent: "center",
            position: "fixed",
            width: "100%",
            zIndex: 5,
          }}
        >
          <Menu.Item key="1">
            <NavLink to="/">Home</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/admin/dashboard">Dashboard</NavLink>
          </Menu.Item>
        </Menu>
        <Switch>
          <Route exact path="/" component={Movies} />
          <Route exact path="/movie/:movieId" component={MovieDetails} />
          <Route exact path="/admin/login" component={AuthPage} />
          <Route exact path="/admin/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
