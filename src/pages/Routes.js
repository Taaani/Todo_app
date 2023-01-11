import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Frontend from "../pages/Frontend";
import Auth from "../pages/Auth";
import MYTodo from "../MyTodo";

const CoustomRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Frontend />} />
        <Route path="/auth*" element={<Auth />} />
        <Route path="/mytodo*" element={<MYTodo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default CoustomRoutes;
