import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import CreatePatient from "./components/CreatePatient";
import { Header } from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { AuthContext } from "./hooks/useAuth";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  return (
    <div className="App">
      <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      <Toaster position="bottom-center"
      reverseOrder={false}/>
      <Header/>

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route path="/signup" element={<Signup login={false} />} />
        <Route path="/login" element={<Signup login={true} />} />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreatePatient />
            </PrivateRoute>
          }
        />
      </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
