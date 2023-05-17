import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserView() {
  const [privateData, setprivateData] = useState(null);

  // get private data on page load -> useEffect()!
  useEffect(()=>{
    requestData();
  }, [])

  const navigate = useNavigate();

  const requestData = async () => {
    //if no token then redirect to login, don't let the user see the page
    if(!localStorage.getItem("token")) navigate("/");

    //1. send post request including authorization header
    let options = {
      method: "GET",
      headers: { "authorization": "Bearer " + localStorage.getItem("token")}
    }
    let response = await fetch("/api/users/private", options);
    let data = await response.json();
    
    //2. store response private data
    setprivateData(data);
  
  };

  const logout = () => {
    //do the logout
    //1. remove token from local storage
    localStorage.removeItem("token");
    //2. redirect to login page
    navigate("/");
  };

  return (
    <div>
      {privateData?.name && (
        <div>
          {privateData.name} {privateData.email}
        </div>
      )}
      <button className="btn btn-outline-dark ml-2" onClick={logout}>
        Log out
      </button>
    </div>
  );
}

export default UserView;
