import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Config/configration";
import { useNavigate } from "react-router-dom";
const initialValue = {
  email: "",
  password: "",
};
const Login = () => {
  const navigate = useNavigate();
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [state, setState] = useState(initialValue);

  //  how to know that a user is login

  // handle submit funcition
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    const { email, password } = state;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("your successfully login ");
        navigate("/");

        // ...
      })
      .catch((error) => {
        console.error(error);
        alert("please give correct email or password");
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name =>", name);
    console.log("value =>", value);
    setState({ ...state, [name]: value });
  };
  return (
    <>
      <div className="main_div">
        <div className="container w-50 backGroundColor rounded-3">
          <div className="row mt-5">
            <div className="col text-center mt-4">
              <h2 className="text-dark">Login form</h2>
            </div>
          </div>
          <div className="row  mt-3">
            <div className="col-10 col-md-10 offset-1 offset-md-1 ">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <input
                    type="email"
                    className="form-control"
                    onChange={handleChange}
                    name="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                {/*  */}

                <div className="input-group mb-1">
                  <input
                    type={isPasswordShow ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    aria-label="Password"
                    name="password"
                    onChange={handleChange}
                    aria-describedby="button-addon2"
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => {
                      setIsPasswordShow(!isPasswordShow);
                    }}
                  >
                    {isPasswordShow ? "Hide" : "Show"}
                  </button>
                </div>
                <small className="form-text text-muted text-white">
                  <Link
                    to="/auth/forgetPassword"
                    className="text-danger text-decoration-none"
                  >
                    Forget Password?
                  </Link>
                </small>
                {/*  */}

                <button type="submit" className="btn btn-primary w-100 my-4">
                  Login
                </button>
              </form>
            </div>
          </div>
          <div className="row ">
            <div className="col text-center mb-4">
              <small className="form-text text-muted text-white">
                <span className="text-dark">Not a Member ? </span>
                <Link
                  to="/auth/register"
                  className="link-danger text-decoration-none"
                >
                  Register Now
                </Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
