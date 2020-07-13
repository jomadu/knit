import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
    Breadcrumbs,
    Box,
    Paper,
    Typography,
    Container,
    Avatar,
    Table,
    TableContainer,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(date, score) {
    return { date, score };
}

const rows = [
    createData("5-20-19", 89),
    createData("5-19-19", 86),
    createData("5-18-19", 84),
    createData("5-17-19", 83),
    createData("5-16-19", 82),
    createData("5-15-19", 80),
];

const AccountContainer = (props) => {
    const classes = useStyles();
    return (
        <Container>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="textPrimary">Username</Typography>
            </Breadcrumbs>
            <Typography variant="h1">Username</Typography>
            <Typography variant="h2">Email</Typography>
            <Avatar>
                <AccountCircleIcon />
            </Avatar>
            <Box display="block">
                <Typography variant="body">Change Username</Typography>
            </Box>
            <Box display="block">
                <Typography variant="body">Change Email</Typography>
            </Box>
            <Box display="block">
                <Typography variant="body">Change Password</Typography>
            </Box>
            <Typography variant="h3">Progress</Typography>

            <img
                src="https://via.placeholder.com/728x120.png"
                alt="Progress Viz"
            />
            <Typography variant="h3">History</Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.date}>
                                <TableCell component="th" scope="row">
                                    {row.date}
                                </TableCell>
                                <TableCell align="right">
                                    {row.score}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (state, actions) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
