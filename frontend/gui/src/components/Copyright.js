import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import {COPYRIGHT} from "../constants/strings";

export const Copyright = () => {
  return (
      <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://material-ui.com/">
              {COPYRIGHT}
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
      </Typography>
  );
};

export default Copyright;
