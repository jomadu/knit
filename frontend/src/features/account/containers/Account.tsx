import React from "react";
import { useParams } from "react-router";

const AccountContainer = () => {
  const { username } = useParams();
  return <h6>Username: {username}</h6>;
};

export default AccountContainer;
