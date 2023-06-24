import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/homeCustom";
import Login from "./components/Login/loginCustom";
import Register from "./components/Register/registerCustom";
import NavBar from "./components/NavBar/navbarCustom";
import { useState } from "react";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
