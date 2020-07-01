import React from "react";
import { connect } from "react-redux";
import { Typography, Grid, Container } from "@material-ui/core";
import AuthFormContainer from "../../auth/containers/AuthForm";


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
            <Grid container justify="center">
                <Grid item xs={12} sm={8} md={6}>
                    <AuthFormContainer />
                </Grid>
            </Grid>
        </Container>
    );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (state, actions) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(AnalyzeContainer);
