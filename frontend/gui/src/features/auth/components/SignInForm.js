import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {
    Grid,
    Typography,
    Container,
    Box,
    ThemeProvider,
    Avatar,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";

import useForm from "../../../common/hooks/useForm";
import useFormStyles from "../../../common/components/styles/index";

export const SignInForm = ({ avatar = true, onSignIn, onSignUp }) => {
    const { values, handleChange, handleSubmit } = useForm(() => {
        onSignIn(values.email, values.password);
    });

    const classes = useFormStyles();

    return (
        <div>
            {avatar ? (
                <Grid container justify="center">
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <LockIcon className={classes.avatarIcon} />
                        </Avatar>
                    </Grid>
                </Grid>
            ) : null}
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                {/* Avoid Chrome autofill */}
                <input
                    autoComplete="email"
                    name="email"
                    style={{ display: "none" }}
                ></input>
                <input
                    autoComplete="current-password"
                    name="password"
                    style={{ display: "none" }}
                ></input>

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
                    <Grid item xs={12} sm={8} className={classes.submitButton}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sign In
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.submitButton}>
                        <Grid container justify="center" alignItems="center">
                            <Grid item>
                                <Typography align="center" variant="body2">
                                    or
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button onClick={onSignUp}>Sign Up</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default SignInForm;
