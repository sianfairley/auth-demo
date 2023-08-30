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
