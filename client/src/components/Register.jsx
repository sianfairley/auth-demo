import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const register = async () => {

    try {
      //1. send new user info to server

      //if I got a 200 ok, then user was correctly created
      if (results.ok) {
      
        //2. redirect user to Login Page
      
      } else {
        console.log(data);
        setError(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-4 offset-4">
        <input
            value={newUser.name}
            onChange={handleChange}
            name="name"
            type="text"
            className="form-control mb-2"
            placeholder="your name"
          />
          
          <input
            value={newUser.email}
            onChange={handleChange}
            name="email"
            type="email"
            className="form-control mb-2"
            placeholder="your email"
          />
          <input
            value={newUser.username}
            onChange={handleChange}
            name="username"
            type="text"
            className="form-control mb-2"
            placeholder="your username"
          />
          <input
            value={newUser.password}
            onChange={handleChange}
            name="password"
            type="password"
            className="form-control mb-2"
            placeholder="your password"
          />
          <button className="btn btn-primary" onClick={register}>
            Register
          </button>
        </div>
      </div>
      <div className="text-danger text-center mt-5">{error}</div>
    </div>
  );
}

export default Register;
