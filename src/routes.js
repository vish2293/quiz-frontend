import React from "react";
import { Redirect } from "react-router-dom";
import Quiz from "./views/Quiz";

export default [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/quiz" />
  },
  {
    path: "/quiz",
    component: Quiz
  },
];
