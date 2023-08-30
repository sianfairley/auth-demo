import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserView() {
  const [privateData, setPrivateData] = useState(null);

  // get private user data on page load -> useEffect()!
  useEffect(()=>{
    requestData();
  }, [])

  const navigate = useNavigate();

  const requestData = async () => {
    //0. if no token then redirect to login, don't let the user see the page
    // even better option if we use a PrivateRoute component to not let the user enter at all
    if(!localStorage.getItem("token")) navigate("/");
    
    //1. send post request including authorization header
    let options = {
      method: "GET",
      headers: {"authorization": "Bearer " + localStorage.getItem("token")}
    }
    const results = await fetch("/api/users/private", options);
    const data = await results.json();

    //2. store response private data
    setPrivateData(data);
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
      {privateData && (
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
