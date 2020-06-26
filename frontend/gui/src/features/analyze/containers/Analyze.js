import React from "react";
import { connect } from "react-redux";
import { Typography, Container } from "@material-ui/core";

const AnalyzeContainer = (props) => {
    return (
        <Container>
            <Typography variant="h1">Analyze</Typography>
            <Typography variant="subtitle1">
                Fragments of time, instant crush oh yeah contact burnin' human
                after all, veridis quo, digital love something about us too long
                discovery, veridis quo teachers. Harder, better, faster,
                stronger high fidelity, the game of love veridis quo instant
                crush, fresh one more time. Veridis quo, face to face, human
                after all.
            </Typography>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (state, actions) => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(AnalyzeContainer);
