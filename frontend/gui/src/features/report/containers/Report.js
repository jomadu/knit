import React from "react";
import { connect } from "react-redux";

import Report from "../components/Report";
import { actions as reportActions } from "../slice";
import { GET_REPORT_DETAIL } from "../actions/getReportDetail";
import { getReports } from "../selectors";

const ReportContainer = (props) => {
    const report = props.reports[props.id];
    let title, description;
    if (report) {
        [title = "title", description = "description"] = report;
    } else {
        // props.getReportDetail(props.id);
    }
    return <Report title={title} description={description} />;
};

const mapStateToProps = (state) => ({
    reports: getReports(state),
});
const mapDispatchToProps = (dispatch) => {
    return {
        getReportDetail: (id) =>
            dispatch(reportActions[GET_REPORT_DETAIL].ASYNC_REQUEST(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer);
