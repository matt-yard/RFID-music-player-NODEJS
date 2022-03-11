import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import SingleSong from "./components/SingleSong";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/songs/:id" component={SingleSong} />
    </Switch>
  );
};

export default Routes;
