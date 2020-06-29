import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import useForm from "../../../common/hooks/useForm";
import useFormStyles from "../../../common/components/styles/index";

export const SignInForm = ({ onSignIn, onSignUp }) => {
    const { values, handleChange, handleSubmit } = useForm(() => {
        onSignIn(values.email, values.password);
    });

    const classes = useFormStyles();

    return (
        <Container className={classes.paper}>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                {/* Avoid Chrome autofill */}
                <input autoComplete="email" name="email" style={{ display: "none" }}></input>
                <input autoComplete="current-password" name="password" style={{ display: "none" }}></input>

                <Grid container justify="center" spacing={1}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={12} sm={8}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <Typography align="center" variant="body2">
                            or
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        item
                        xs={12}
                        sm={3}
                        className={classes.submitAlternate}
                        justify="center"
                    >
                        <Button onClick={onSignUp}>Sign Up</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default SignInForm;
