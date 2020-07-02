import React from "react";
import { Container, Paper, Box } from "@material-ui/core";
import AuthForm from "../containers/AuthForm";
import useFormStyles from "../../../common/components/styles/index";

const Auth = (props) => {
    const classes = useFormStyles();

    return (
        <Box margin={3}>
            <Container maxWidth="sm">
                <Paper className={classes.paper}>
                    <AuthForm />
                </Paper>
            </Container>
        </Box>
    );
};

export default Auth;
