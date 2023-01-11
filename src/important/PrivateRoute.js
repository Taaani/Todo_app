import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import Login from "../pages/Auth/Login";

const PrivateRoute = (props) => {
  const { state } = useContext(AuthContext);
  const { isAuthanticated } = state;
  const { Component } = props;
  if (!isAuthanticated) {
    return <Login />;
  } else {
    return <Component />;
  }
};

export default PrivateRoute;
