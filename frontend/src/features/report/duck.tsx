// --------
// Imports
// --------
// import axios from "axios";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import {
  FeatureState,
  initialFeatureState,
  EntityTable,
  Status,
  createEmptyEntityTable,
} from "../constants";

import { JWT } from "../user/duck";
import { RootState } from "../../app/rootReducer";

// --------
// Constants
// --------
export const REPORT = "report";
export interface Report {
  id: number;
  title: string;
  body: string;
}

// --------
// Thunks
// --------

const testReportsTable: EntityTable<Report> = {
  byId: {
    1: {
      id: 1,
      title: "Report 1",
      body: "Report 1 Description",
    },
    2: {
      id: 2,
      title: "Report 2",
      body: "Report 2 Description",
    },
    3: {
      id: 3,
      title: "Report 3",
      body: "Report 3 Description",
    },
    4: {
      id: 4,
      title: "Report 4",
      body: "Report 4 Description",
    },
  },
  allIds: [1, 2, 3, 4],
  status: Status.idle,
  error: null,
};

export interface fetchReportsArg {
  jwt: JWT;
}

export interface fetchReportsRes {
  reports: EntityTable<Report>;
}

export const fetchReports = createAsyncThunk(
  `${REPORT}/fetchReports`,
  async (props: fetchReportsArg) => {
    return { reports: testReportsTable } as fetchReportsRes;
    //   return axios
    //     .get("endpoint", createAxiosAuthConfig(jwt))
    //     .then((response) => response.data);
  }
);

// --------
// State
// --------
interface ReportEntitiesState {
  reports: EntityTable<Report>;
}
const initialReportEntitiesState: ReportEntitiesState = {
  reports: createEmptyEntityTable<Report>(),
};

interface ReportState extends FeatureState {
  entities: ReportEntitiesState;
  session: null;
}
const initialReportState: ReportState = Object.assign({}, initialFeatureState, {
  entities: initialReportEntitiesState,
  session: null,
});

// --------
// Selectors
// --------
export const reportFeatureSelector = (state: RootState) => state.report;
export const reportsSelector = createSelector(
  reportFeatureSelector,
  (report) => report.entities.reports
);
export const reportByIdSelector = (id: number) =>
  createSelector(reportsSelector, (reports) =>
    reports.byId[id] ? reports.byId[id] : undefined
  );

// --------
// Slice
// --------
const slice = createSlice({
  name: REPORT,
  initialState: initialReportState,
  reducers: {
    /*
      myRegularAction: (state, action) => {
          // perform reducer on state using action.payload
      }
      */
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReports.pending, (state, action) => {
      state.entities.reports.status = Status.pending;
    });
    builder.addCase(fetchReports.fulfilled, (state, { payload }) => {
      state.entities.reports = payload.reports;
      state.entities.reports.status = Status.fulfilled;
    });
    builder.addCase(fetchReports.rejected, (state, { error }) => {
      state.entities.reports.error = error;
      state.entities.reports.status = Status.rejected;
    });
  },
});

const { reducer } = slice;
export default reducer;

// --------
// Utilities
// --------
