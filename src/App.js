import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./app/layouts/login";
import Contacts from "./app/layouts/contacts";
import NavBar from "./app/ui/navBar";
import AppLoader from "./app/ui/hoc/appLoader";
import ProtectedRoute from "./app/ui/hoc/protectedRoute";

function App() {
  return (
    <>
      <AppLoader>
        <NavBar />
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute path="/contacts" component={Contacts} />
          <Redirect to="/login" />
        </Switch>
      </AppLoader>
    </>
  );
}

export default App;
