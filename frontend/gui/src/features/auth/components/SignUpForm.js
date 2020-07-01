import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import useForm from "../../../common/hooks/useForm";
import useFormStyles from "../../../common/components/styles/index";

export const SignUpForm = ({ onSignUp, onSignIn }) => {
    const { values, handleChange, handleSubmit } = useForm(() => {
        onSignUp(
            values.email,
            values.username,
            values.password,
            values.rePassword
        );
    });

    const classes = useFormStyles();

    return (
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                {/* Avoid Chrome autofill */}
                <input autoComplete="email" name="email" style={{ display: "none" }}></input>
                <input autoComplete="username" name="username" style={{ display: "none" }}></input>
                <input autoComplete="new-password" name="password" style={{ display: "none" }}></input>
                <input autoComplete="new-password" name="re-password" style={{ display: "none" }}></input>

                <Grid container justify="center" spacing={1}>
                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="rePassword"
                            label="Re-Password"
                            name="rePassword"
                            type="password"
                            autoComplete="new-password"
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Grid container justify="center" alignItems="baseline">
                    <Grid item xs={12} sm={8}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
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
                        <Button onClick={onSignIn}>Sign In</Button>
                    </Grid>
                </Grid>
            </form>
    );
};

export default SignUpForm;
