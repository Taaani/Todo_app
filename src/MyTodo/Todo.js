import React, { useContext, useState } from "react";
import { doc, setDoc, serverTimestamp, } from "firebase/firestore/lite";
import { AuthContext } from "../Contexts/AuthContext";
import { fireStore } from "../Config/configration";

const instialState = {
  title: "",
  location: "",
  discription: "",
};

const Todo = () => {
  const { state } = useContext(AuthContext);
  const { user } = state;

  const [todostate, setState] = useState(instialState);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(todostate);

    let { title, location, discription } = todostate;
    title = title.trim();
    location = location.trim();

    discription = discription.trim();
    if (title.length < 3) {
      return window.notify("title length should be greater then 3", "error");
    }
    if (location.length < 3) {
      return window.notify("location length should be greater then 3", "error");
    }
    if (discription.length < 10) {
      return window.notify(
        "discription length should be greater then 10",
        "error"
      );
    }

    let formData = { title, location, discription };
    formData.dateCreate = serverTimestamp();
    formData.id = window.getRandomId();
    formData.status = "active";
    formData.createdby = {
      email: user.email,
      uid: user.uid,
    };

    createDocuments(formData);
  };
  const createDocuments = async (formData) => {
    console.log(formData);
    try {
      await setDoc(doc(fireStore, "todos", formData.id), formData);
      window.notify("Todo is successfully added", "success");
    } catch (error) {
      console.error(error);
      window.notify("something want wrong", "warning");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setState({ ...todostate, [name]: value });
  };
  return (
    <>
      <div className=" card mt-5  mx-5 ">
        <div className="container ">
          <div className="row mt-2">
            <div className="col">
              <h2 className="text-center ">Todo</h2>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row py-4">
              <div className="col-12 col-md-6 ">
                <div className="form-group">
                  <label for="exampleInputEmail1">Enter Title</label>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6 ">
                <div className="form-group">
                  <label for="exampleInputEmail1">Enter location</label>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Location"
                    name="location"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label for="exampleInputEmail1">Enter Discription</label>
                <textarea
                  name="discription"
                  className="form-control"
                  cols="30"
                  rows="10"
                  placeholder="Discription"
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="col text-center">
                <button className="btn btn-danger w-50  mb-3">
                  Add your Todo
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Todo;
