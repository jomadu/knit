import { createSelector } from "reselect";

export const getReports = createSelector(
  (state) => state.report,
  (report) => report
);