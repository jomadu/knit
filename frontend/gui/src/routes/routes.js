const BACKEND_URL = "http://127.0.0.1:8000";
const USERNAME_FIELD = "email";
const AUTH_URL = "auth";
const API_URL = "api/v1";

let djoser = {
    userCreate: `/users/`,
    userActivate: `/users/activation/`,
    userResendActivationEmail: `/users/resend_activation/`,
    user: `/users/me`,
    setUsername: `/users/set_${USERNAME_FIELD}/`,
    resetUsername: `/users/reset_${USERNAME_FIELD}/`,
    resetUsernameConfirmation: `/users/reset_${USERNAME_FIELD}_confirm/`,
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

export const backendEndpoints = {
    djoser: Object.assign({}, djoser),
    api: Object.assign({}, api)
};

export const frontendEndpoints = {
    home: "/",
    user: "/:username",
    images: "/images",
    imageDetail: "/images/:id",
    signIn: "/signin",
    signUp: "/signup",
};