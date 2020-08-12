import React from "react";
import { Link } from "react-router-dom";
import { Routes } from "../constants";
import { useAppDispatch } from "../store";
import {
  signOut,
  isAuthenticatedSelector,
  userUsernameSelector,
} from "../../features/user/duck";
import { useSelector } from "react-redux";
import { reverse } from "../../thirdParty/named-urls";

const Nav = () => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const username = useSelector(userUsernameSelector);
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
        {isAuthenticated ? (
          <>
            <li>
              <Link to={reverse(Routes.account, { username: username })}>
                {username}
              </Link>
            </li>
            <li>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={Routes.signIn}>Sign In</Link>
            </li>
            <li>
              <Link to={Routes.signUp}>Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
