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
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      };
      //1. send new user info to server
      let response = await fetch("/api/users/register", options);
      //if I got a 200 ok, then user was correctly created
      if (response.ok) {
        console.log(newUser);
        navigate("/login"); //2. redirect user to Login Page
      } else {
        let data = await response.json();
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
          <form>
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
          </form>
        </div>
      </div>
      <div className="text-danger text-center mt-5">{error}</div>
    </div>
  );
}

export default Register;
