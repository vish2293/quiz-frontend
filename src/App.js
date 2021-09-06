import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from "./routes";
import './App.css';

export default () => (
  <Router basename={process.env.REACT_APP_BASENAME || ""}>
    <div>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={(props => {
              return (
                (route.layout) ?
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                  : <div><route.component {...props} /></div>
              );
            })}
          />
        );
      })}
    </div>
  </Router>
);
