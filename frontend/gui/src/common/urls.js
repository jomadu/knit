import {USER_FIELDS} from "../features/auth/constants";


const BACKEND_URL = "http://127.0.0.1:8000";
const AUTH_URL = "auth";
const API_URL = "api/v1";


let djoser = {
    userCreate: `/users/`,
    userActivate: `/users/activation/`,
    userResendActivationEmail: `/users/resend_activation/`,
    user: `/users/me`,
    setUsername: `/users/set_${USER_FIELDS.AUTH_USERNAME}/`,
    resetUsername: `/users/reset_${USER_FIELDS.AUTH_USERNAME}/`,
    resetUsernameConfirmation: `/users/reset_${USER_FIELDS.AUTH_USERNAME}_confirm/`,
    setPassword: `/users/set_password/`,
    resetPassword: `/users/reset_password/`,
    resetPasswordConfirmation: `/users/reset_password_confirm/`,
    jwtCreate: `/jwt/create/`,
    jwtRefresh: `/jwt/refresh/`,
    jwtVerify: `/jwt/verify/`,
};

for (let endpoint in djoser) {
    djoser[endpoint] = BACKEND_URL + "/" + AUTH_URL + djoser[endpoint];
}

let api = {
    images: "/images/",
};

for (let endpoint in api) {
    api[endpoint] = BACKEND_URL + "/" + API_URL + api[endpoint];
}

export const backend = {
    djoser,
    api
};

export const frontend = {
    welcome: "/",
    about:"/about",
    analyze: "/analyze",
    userAccount: "/u/:username",
    userProgress: "/u/:username/progress",
    userHistory: "/u/:username/history",
};
