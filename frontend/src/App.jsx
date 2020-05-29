import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Movies} />
        <Route exact path="/movie/:movieId" component={MovieDetails} />
        <Route exact path="/admin/login" component={AuthPage} />
        <Route exact path="/admin/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default Routes;
