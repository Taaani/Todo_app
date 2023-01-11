import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contect from "./Contect";
import PageNotFound from "../pageNoFound/PageNotFound";
// components navbar and footer
import NavBar from "../../components/Header";
import Footer from "../../components/Footer";
import Topbar from "../../components/Header/Topbar";
import PrivateRoute from "../../important/PrivateRoute";
const Index = () => {
  return (
    <>
      <Topbar />
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<PrivateRoute Component={Home} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contect" element={<Contect />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default Index;
