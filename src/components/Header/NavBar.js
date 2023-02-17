import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { auth } from "../../Config/configration";
const NavBar = () => {
  const { state, dispatch } = useContext(AuthContext);
  console.log(state);
  const { isAuthanticated } = state;

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // const handleLogin = () => {
  //   dispatch({ type: "LOGIN" });
  // };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Todo
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/contect">
                  contect
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle active"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Authantication
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/auth/login">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/auth/register">
                      Sign up
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/auth/forgetPassword">
                      Forget Password
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            {!isAuthanticated ? (
              <Link className="btn btn-outline-dark" to="auth/login">
                LOGIN
              </Link>
            ) : (
              <>
                <Link className=" btn btn-info mx-2" to="/mytodo/todo">
                  Todo
                </Link>
                <Link className=" btn btn-info mx-2" to="/mytodo/storage">
                  Storage
                </Link>
                <button
                  className="btn btn-outline-dark"
                  onClick={handleLogout}
                  type="submit"
                >
                  LOGOUT
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
