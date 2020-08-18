import React from "react";
import { useSelector } from "react-redux";
import { userEmailSelector, userUsernameSelector } from "../../user/duck";
import HistoryContainer from "../../history/containers/History";

const AccountContainer = () => {
  const username = useSelector(userUsernameSelector);
  const email = useSelector(userEmailSelector);
  return (
    <>
      <h1>{username}</h1>
      <img src="https://via.placeholder.com/150" alt="avatar" />
      <h2>{email}</h2>
      <h2>Progress</h2>
      <h2>History</h2>
      <HistoryContainer />
    </>
  );
};

export default AccountContainer;
