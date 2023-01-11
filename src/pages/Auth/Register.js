import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Config/configration";
import { doc, setDoc } from "firebase/firestore/lite";
import { fireStore } from "../../Config/configration";
import { async } from "@firebase/util";

const intialState = {
  names: "",
  email: "",
  password: "",
};
const SignUp = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [state, setState] = useState(intialState);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    const { email, password } = state;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("user is Successfully register");
        addDocument(user);

        // ...
      })
      .catch((error) => {
        //
        console.log(error);
        // ..
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    console.log("name =>", name);
    console.log("value =>", value);
  };

  const addDocument = async (user) => {
    const { names } = state;
    try {
      await setDoc(doc(fireStore, "users", user.uid), {
        firstname: names,
        lastName: "",
        userId: user.uid,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="main_div">
        <div className="container w-50 backGroundColor rounded-3">
          <div className="row mt-5">
            <div className="col text-center mt-4">
              <h2 className="text-dark">Sign up form</h2>
            </div>
          </div>
          <div className="row  mt-3">
            <div className="col-10 col-md-10 offset-1 offset-md-1 ">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <input
                    type="text"
                    className="form-control"
                    name="names"
                    onChange={handleChange}
                    aria-describedby="emailHelp"
                    placeholder="Enter Name"
                  />
                </div>
                <div className="form-group mb-4">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={handleChange}
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div class="input-group mb-3">
                  <input
                    type={isPasswordShow ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    class="form-control"
                    placeholder="Password"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    onClick={() => {
                      setIsPasswordShow(!isPasswordShow);
                    }}
                  >
                    {isPasswordShow ? "Hide" : "Show"}
                  </button>
                </div>

                <button type="submit" className="btn btn-primary w-100 my-4 ">
                  Create Account{" "}
                </button>
              </form>
            </div>
          </div>
          <div className="row ">
            <div className="col text-center mb-4">
              <small id="emailHelp" class="form-text text-muted text-white">
                <span className="text-dark">Already Registered Then </span>
                <Link
                  to="/auth/Login"
                  className="link-danger text-decoration-none"
                >
                  Login
                </Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
