import React, { useEffect } from "react";

import { Route, Switch, useLocation } from "react-router-dom";
import "./App.css";

import AuthToken from "./functions/AuthToken";

import ReduxToastr from "react-redux-toastr";
import routes from "./router";
import Navbar from "./components/Navbar";

if (localStorage.token) {
  AuthToken(localStorage.token);
}

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" &&
        location.pathname !== "/login" &&
        location.pathname !== "/register" && <Navbar />}

      <ReduxToastr
        timeOut={1500}
        newestOnTop={false}
        position="top-right"
        getState={(state) => state.toastr}
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />

      <Switch>
        {routes.map((route, index) => (
          <Route
            exact
            path={route.route}
            render={(routeProps) => <route.component {...routeProps} />}
            key={index}
          />
        ))}
      </Switch>
    </div>
  );
}

export default App;
