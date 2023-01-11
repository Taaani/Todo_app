import React from "react";
import { Routes, Route } from "react-router-dom";
import Todo from "./Todo";
const Index = () => {
  return (
    <Routes>
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
};

export default Index;
