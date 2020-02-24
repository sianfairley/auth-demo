import React from "react";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "test",
      password: "test"
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  login = () => {
    axios("/users/login", {
      method: "POST",
      data: {
        username: this.state.username,
        password: this.state.password
      }
    })
      .then(result => {
        //store it locally
        localStorage.setItem("token", result.data.token);
        console.log(result.data.message, result.data.token);
      })
      .catch(error => console.log(error));
  };

  requestData = () => {
    axios("/users/profile", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(result => console.log(result.data.message))
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <div>
          <input
            value={this.state.username}
            onChange={this.handleChange}
            name="username"
            type="text"
            className="form-control mb-2"
          />
          <input
            value={this.state.password}
            onChange={this.handleChange}
            name="password"
            type="password"
            className="form-control mb-2"
          />
          <button className=" btn btn-primary" onClick={this.login}>
            Log in
          </button>
        </div>
        <div className="text-center p-4">
          <button
            className=" btn btn-outline-primary"
            onClick={this.requestData}
          >
            Request protected data
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
