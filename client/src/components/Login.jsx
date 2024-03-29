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
      
      //if I got a 200 ok, then user was authorized
      if (results.ok) {
        //2. get token from server and store in localStorage
      
        //3. redirect user to Private Page
      
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
            value={credentials.username}
            onChange={handleChange}
            name="username"
            type="text"
            className="form-control mb-2"
            placeholder="your username"
          />
          <input
            value={credentials.password}
            onChange={handleChange}
            name="password"
            type="password"
            className="form-control mb-2"
            placeholder="your password"
          />
          <button className="btn btn-primary" onClick={login}>
            Log in
          </button>
        </div>
      </div>
      <div className="text-danger text-center mt-5">{error}</div>
    </div>
  );
}

export default Login;
