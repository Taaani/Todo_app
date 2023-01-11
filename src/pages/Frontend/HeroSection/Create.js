import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { collection, getDocs, deleteDoc, doc, setDoc, serverTimestamp } from "firebase/firestore/lite";
import { AuthContext } from "../../../Contexts/AuthContext";
import { fireStore } from "../../../Config/configration";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
const instialState = {
  title: "",
  location: "",
  discription: "",
};

const Todo = () => {
  const { state } = useContext(AuthContext);
  const { user } = state;
  const [documents, setDocuments] = useState([]);
  // const [todostate, setState] = useState(instialState);
  const [todo, setTodo] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setTodo({ ...todo, [name]: value });
  };

  const handleUpdate = async () => {
    let formData = { ...todo }
    formData.dateCreate = formData.dateCreate
    formData.dateModified = serverTimestamp();
    formData.dateModifier = {
      email: user.email,
      uid: user.uid,
    }
    try {
      await setDoc(doc(fireStore, "todos", formData.id), formData, { murge: true });
      window.notify("Todo is successfully updated", "success");
    } catch (error) {
      console.error(error);
      window.notify("something want wrong", "warning");
    }

  };


  // console.log("documents", documents);


  const fatchDocuments = async () => {
    let array = [];

    const querySnapshot = await getDocs(collection(fireStore, "todos"));
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      // console.log("data=>", data);
      array.push(data);
    });

    setDocuments(array);
  };

  useEffect(() => {
    fatchDocuments();
  }, []);

  const handleDelete = async (todo) => {
    console.log("delete wala", todo);
    try {
      await deleteDoc(doc(fireStore, "todos", todo.id));
      let newDocument = documents.filter((doc) => {
        return doc.id != todo.id;
      });
      setDocuments(newDocument);
      window.notify("Data is successfully Deleted", "success");
    } catch (error) {
      console.error(error);
      window.notify("Data is successfully Deleted", "success");
    }
  };




  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <h1 className="text-center">My Todos</h1>
          </div>
        </div>
      </div>
      <div className=" card mt-5  mx-5 ">
        <div className="container ">
          <div className="row">
            <div className="col">
              <Table>
                <Thead>
                  <Tr>
                    <Th>No#1</Th>
                    <Th>Tilte</Th>
                    <Th>Location</Th>
                    <Th>Discription</Th>
                    <Th>Buttons</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {documents.map((todo, i) => {
                    return (
                      <Tr key={i}>
                        <Td>{i + 1}</Td>
                        <Td>{todo.title}</Td>
                        <Td>{todo.location}</Td>
                        <Td>{todo.discription}</Td>
                        <Td>
                          <button
                            className="btn btn-primary me-1 btn-sm"
                            onClick={() => {
                              setTodo(todo);
                            }}
                            data-bs-toggle="modal"
                            data-bs-target="#editModel"
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              handleDelete(todo);
                            }}
                          >
                            Delete
                          </button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="editModel"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form >
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
                        value={todo.title}
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
                        value={todo.location}
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
                      value={todo.discription}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col text-center">
                    <button className="btn btn-danger w-50  mb-3">
                      Add your Todo
                    </button>
                  </div>
                </div> */}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
