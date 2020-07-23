import axios from "axios";

import { backendBaseURL } from "../../../common/constants";
import { userFields, backendEndpoints } from "../constants";

export const postToJWTCreate = (authUsername: string, password: string) => {
    console.log(backendBaseURL, backendEndpoints.jwtCreate);
    return axios
        .post(
            backendEndpoints.jwtCreate,
            {
                [userFields.authUsername]: authUsername,
                password: password,
            },
            { baseURL: backendBaseURL }
        )
        .then((response) => response.data);
};
export const getFromUser = (access: string) => {
    return axios
        .get(backendEndpoints.user, {
            baseURL: backendBaseURL,
            headers: {
                Authorization: "Bearer " + access,
            },
        })
        .then((response) => response.data);
};

export const postToUserCreate = (
    authUsername: string,
    username: string,
    password: string,
    rePassword: string
) => {
    return axios
        .post(
            backendEndpoints.userCreate,
            {
                [userFields.authUsername]: authUsername,
                [userFields.username]: username,
                password: password,
                re_password: rePassword,
            },
            { baseURL: backendBaseURL }
        )
        .then((response) => response.data);
};
