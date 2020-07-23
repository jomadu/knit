export const featureName = "auth";

export const userFields = {
    authUsername: "email",
    username: "username",
    email: "email",
    id: "id",
};

export const backendEndpoints = {
    userCreate: `/auth/users/`,
    userActivate: `/auth/users/activation/`,
    userResendActivationEmail: `/auth/users/resend_activation/`,
    user: `/auth/users/me`,
    setUsername: `/auth/users/set_${userFields.authUsername}/`,
    resetUsername: `/auth/users/reset_${userFields.authUsername}/`,
    resetUsernameConfirmation: `/auth/users/reset_${userFields.authUsername}_confirm/`,
    setPassword: `/auth/users/set_password/`,
    resetPassword: `/auth/users/reset_password/`,
    resetPasswordConfirmation: `/auth/users/reset_password_confirm/`,
    jwtCreate: `/auth/jwt/create/`,
    jwtRefresh: `/auth/jwt/refresh/`,
    jwtVerify: `/auth/jwt/verify/`,
};