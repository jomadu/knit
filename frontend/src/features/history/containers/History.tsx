import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { reportsSelector, fetchReports } from "../../report/duck";
import { Status } from "../../constants";
import { useAppDispatch } from "../../../app/store";
import { userJWTSelector, isAuthenticatedSelector } from "../../user/duck";
const HistoryContainer = () => {
  const reports = useSelector(reportsSelector);
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const jwt = useSelector(userJWTSelector);
  const dispatch = useAppDispatch();
  console.log(reports);

  useEffect(() => {
    if (isAuthenticated && jwt) {
      if (reports.status === Status.idle) {
        dispatch(fetchReports({ jwt: jwt }));
      }
    }
  }, [isAuthenticated, jwt, reports, dispatch]);

  const rows = reports.allIds.map((id) => (
    <li key={id}>
      <h4>{reports.byId[id].title}</h4>
      <p>{reports.byId[id].body}</p>
    </li>
  ));
  return (
    <>
      <ul>{rows}</ul>
    </>
  );
};

export default HistoryContainer;
