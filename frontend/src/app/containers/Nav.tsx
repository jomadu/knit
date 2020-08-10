import React from "react";
import { Link } from "react-router-dom";
import { Routes } from "../constants";
import { useAppDispatch } from "../store";
import { signOut } from "../../features/user/duck";

const Nav = () => {
  const dispatch = useAppDispatch();

  const handleSignOut = () => dispatch(signOut());

  return (
    <nav>
      <ul>
        <li>
          <Link to={Routes.welcome}>Welcome</Link>
        </li>
        <li>
          <Link to={Routes.about}>About</Link>
        </li>
        <li>
          <Link to={Routes.signIn}>Sign In</Link>
        </li>
        <li>
          <Link to={Routes.signUp}>Sign Up</Link>
        </li>
        <li>
          <button onClick={handleSignOut}>Sign Out</button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
