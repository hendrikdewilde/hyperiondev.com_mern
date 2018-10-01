import React from "react";

function UserMenu(props) {
  return (
    <ul className="myMenu">
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/aboutUs">About us</a>
      </li>
      <li>
        <a href="/meetTheTeam">Meet the Team</a>
      </li>
      <li>
        <a href="/tasks">Tasks</a>
      </li>
      <li>
        <a href="/profile">Profile</a>
      </li>
      <li>
        <a href="/logout">Logout</a>
      </li>
    </ul>
  );
}

function GuestMenu(props) {
  return (
    <ul className="myMenu">
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/aboutUs">About us</a>
      </li>
      <li>
        <a href="/meetTheTeam">Meet the Team</a>
      </li>
      <li>
        <a href="/login">Login</a>
      </li>
    </ul>
  );
}

function GreetingMenu(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserMenu />;
  }
  return <GuestMenu />;
}

export default GreetingMenu;
