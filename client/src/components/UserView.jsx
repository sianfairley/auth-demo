import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserView() {
  const [privateData, setprivateData] = useState("");

  // get private data on page load -> useEffect()!

  const requestData = async () => {
    //get private Data
    //1. send post request including authorization header
    //2. store response private data
  
  };

  const logout = () => {
    //do the logout
    //1. remove token from local storage
    //2. redirect to login page
  };

  return (
    <div>
      <h2>Super private page! Here is your private message:</h2>
      <div>{privateData}</div>
      <button className="btn btn-outline-dark ml-2" onClick={logout}>
        Log out
      </button>
    </div>
  );
}

export default UserView;
