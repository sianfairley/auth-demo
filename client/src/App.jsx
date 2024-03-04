import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import UserView from "./components/UserView";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";

function App() {
  return (
    <div className="App container p-5">
      <div>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/private" element={<UserView />} />
            {/* //even better, user a PrivateRoute component to secure this path 
            <Route path="/private" element={<PrivateRoute><UserView /></PrivateRoute>}></Route> 
          */}
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
