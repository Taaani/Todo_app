import React from "react";
import { Routes, Route } from "react-router-dom";
import Storage from "./Storage";
import Todo from "./Todo";
const Index = () => {
  return (
    <Routes>
      <Route path="/todo" element={<Todo />} />
      <Route path="/storage" element={<Storage />} />
    </Routes>
  );
};

export default Index;
