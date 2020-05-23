import React from "react";
import { connect } from "react-redux";
import NavigationListItem from "../components/Navigation";

const ConnectedNavigationContainer = (props) => {
    let navItems = [];
    if (props.isAuthenticated) {
        navItems.push(
            <NavigationListItem label="My Account" to={"/myaccount"} />
        );
        navItems.push(<NavigationListItem label="Sign Out" to={"/"} />);
    } else {
        navItems.push(<NavigationListItem label="Sign In" to={"/signin"} />);
    }
    navItems.push(<NavigationListItem label="Images" to={"/images"} />);
    return (
        <nav>
            <ul>{navItems}</ul>
        </nav>
    );
};

const mapStateToProps = (state) => ({ isAuthenticated: state.isAuthenticated });

const NavigationContainer = connect(
    mapStateToProps,
    null
)(ConnectedNavigationContainer);

export default NavigationContainer;
