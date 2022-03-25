import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./app/layouts/login";
import Users from "./app/layouts/users";
import NavBar from "./app/ui/navBar";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/users" component={Users} />
        <Redirect to="/login" />
      </Switch>
    </>
  );
}

export default App;
