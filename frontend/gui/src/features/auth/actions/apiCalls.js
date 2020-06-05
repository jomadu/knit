import {USERNAME_FIELD} from "../constants";
import {backend} from "../../../common/urls";
import axios from "axios";

export const postToJWTCreate = (username, password) => {
    return axios
        .post(backend.djoser.jwtCreate, {
            [USERNAME_FIELD]: username,
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
    username,
    requiredFields,
    password,
    rePassword
) => {
    return axios
        .post(backend.djoser.userCreate, {
            [USERNAME_FIELD]: username,
            ...requiredFields,
            password: password,
            re_password: rePassword,
        })
        .then((response) => response.data);
};
