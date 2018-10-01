// src/functions/users.js
import React from "react";

function UserGreeting() {
  if (!window.sessionStorage.getItem("userData")) {
    return <h3>Welcome back</h3>;
  } else {
    return (
      <h3>
        Welcome back{" "}
        {JSON.parse(window.sessionStorage.getItem("userData")).name}
      </h3>
    );
  }
}

function GuestGreeting() {
  return <h3>Please sign in.</h3>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

export default Greeting;
