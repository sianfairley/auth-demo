import React from "react";
import "./App.css";
import { Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import UserView from "./components/UserView";
import PrivateRoute from "./components/PrivateRoute";

function App() {

  return (
    <div className="App container p-5">
      <div>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/private" element={<UserView />}></Route>
          {/* //even better, user a PrivateRoute component to secure this path 
            <Route path="/private" element={<PrivateRoute><UserView /></PrivateRoute>}></Route> 
          */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
