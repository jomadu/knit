import React from "react";
import { Link } from "react-router-dom";

export const NavigationListItem = (props) => {
    return (
        <li>
            <Link to={props.to}> {props.label} </Link>
        </li>
    );
};

export default NavigationListItem;
