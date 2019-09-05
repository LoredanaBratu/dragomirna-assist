import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Navbar from "./components/navbar/navbar";
import aboutEvent from "./components/about-event";
import roadDetails from "./components/road-details";
import Harta from "./components/map";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/mapa" component={Harta} />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/about-event/:id" component={aboutEvent} />
        <Route
          exact
          path="/road-details/:competitionId"
          component={roadDetails}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default () => <App />;
