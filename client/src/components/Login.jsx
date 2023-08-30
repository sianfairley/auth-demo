import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    //do the login

    try {
    //1. send credentials to server

    //2. get token from server and store in localStorage

    //3. redirect user to Private Page

    } catch(err) {
      console.log(err);
    }

  };

  return (
    <div className="row">
      <div className="col-4 offset-4">
        <input
          value={credentials.username}
          onChange={handleChange}
          name="username"
          type="text"
          className="form-control mb-2"
        />
        <input
          value={credentials.password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
        />
        <button className="btn btn-primary" onClick={login}>
          Log in
        </button>
      </div>
      {error}
    </div>
  );
}

export default Login;
