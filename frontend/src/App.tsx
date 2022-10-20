import React from "react";
import { Routes, Route } from "react-router-dom";
import CreatePatient from "./components/CreatePatient";
import { Header } from "./components/Header";

import Home from "./pages/Home";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup login={false} />} />
        <Route path="/login" element={<Signup login={true} />} />
        <Route path="/create" element={<CreatePatient />} />
      </Routes>
    </div>
  );
}

export default App;
