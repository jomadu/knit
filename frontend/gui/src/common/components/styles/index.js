import { makeStyles } from "@material-ui/core/styles";

const useFormStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    avatar: {
        padding: theme.spacing(2),
        margin: theme.spacing(2)
    },
    avatarIcon: {
        fontSize: theme.spacing(5)
    },
    title: {
        textAlign: "center",
        margin: theme.spacing(1, 0, 1),
    },
    submitButton: {
        marginTop: theme.spacing(3),
    },
}));

export default useFormStyles;
