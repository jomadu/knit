import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Avatar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import useForm from "../../../common/hooks/useForm";
import useFormStyles from "../../../common/components/styles/index";

import PersonAddIcon from "@material-ui/icons/PersonAdd";

export const SignUpForm = ({ avatar = true, onSignUp, onSignIn }) => {
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
        <div>
            {avatar ? (
                <Grid container justify="center">
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <PersonAddIcon className={classes.avatarIcon} />
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
                    autoComplete="username"
                    name="username"
                    style={{ display: "none" }}
                ></input>
                <input
                    autoComplete="new-password"
                    name="password"
                    style={{ display: "none" }}
                ></input>
                <input
                    autoComplete="new-password"
                    name="re-password"
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
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={12} sm={8} className={classes.submitButton}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sign Up
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
                                <Button onClick={onSignIn}>Sign In</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default SignUpForm;
