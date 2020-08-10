import {USER_FIELDS} from "../constants";
import {backend} from "../../../common/urls";
import axios from "axios";

export const postToJWTCreate = (authUsername, password) => {
    return axios
        .post(backend.djoser.jwtCreate, {
            [USER_FIELDS.AUTH_USERNAME]: authUsername,
            password: password,
        })
        .then((response) => response.data);
};
export const getFromUser = (access) => {
    return axios
        .get(backend.djoser.user, {
            headers: {
                Authorization: "Bearer " + access,
            },
        })
        .then((response) => response.data);
};

export const postToUserCreate = (
    authUsername,
    requiredFields,
    password,
    rePassword
) => {
    return axios
        .post(backend.djoser.userCreate, {
            [USER_FIELDS.AUTH_USERNAME]: authUsername,
            ...requiredFields,
            password: password,
            re_password: rePassword,
        })
        .then((response) => response.data);
};