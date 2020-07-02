import React from "react";
import { Container, Paper, Box, Grid } from "@material-ui/core";
import AuthForm from "../containers/AuthForm";
import useFormStyles from "../../../common/components/styles/index";

const Auth = (props) => {
    const classes = useFormStyles();

    return (
        <Box marginTop={10}>
            <Container disableGutters maxWidth="sm">
                <Paper className={classes.paper}>
                    <AuthForm />
                </Paper>
            </Container>
        </Box>
    );
};

export default Auth;
