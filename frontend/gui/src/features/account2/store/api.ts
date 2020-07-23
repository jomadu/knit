import axios from "axios";

import { backendBaseURL } from "../../../common/constants";
import { userFields, accountEndpoints } from "../constants";

export const postToJWTCreate = (authUsername: string, password: string) => {
    console.log(backendBaseURL, accountEndpoints.jwtCreate);
    return axios
        .post(
            accountEndpoints.jwtCreate,
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
        .get(accountEndpoints.user, {
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
            accountEndpoints.userCreate,
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
