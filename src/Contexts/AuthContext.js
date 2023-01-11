import React, { createContext, useReducer, useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Config/configration";
const initialState = { isAuthanticated: false };

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthanticated: true,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        isAuthanticated: false,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log("user login");
        dispatch({ type: "LOGIN", payload: { user } });
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
