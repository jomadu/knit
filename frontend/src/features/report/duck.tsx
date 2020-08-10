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
  initialEntityTable,
  Status,
} from "../constants";

import { JWT } from "../user/duck";

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

const testReportsTable: EntityTable = {
  byId: {},
  allIds: [],
  status: Status.idle,
  error: null,
};

interface fetchReportsResolution {
  reports: EntityTable;
}

export const fetchReports = createAsyncThunk<
  fetchReportsResolution,
  {},
  {
    extra: {
      jwt: JWT;
    };
  }
>(`${REPORT}/fetchReports`, async (props, thunkApi) => {
  return { reports: testReportsTable };
  //   return axios
  //     .get("endpoint", createAxiosAuthConfig(thunkApi.extra.jwt))
  //     .then((response) => response.data);
});

// --------
// State
// --------
interface ReportEntitiesState {
  reports: EntityTable;
}
const initialReportEntitiesState: ReportEntitiesState = {
  reports: initialEntityTable,
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
export const reportsSelector = (state: ReportState) => state.entities.reports;
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
