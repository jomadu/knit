import { SerializedError } from "@reduxjs/toolkit";

export const backendBaseURL = "http://127.0.0.1:8000";

export type LocationState = {
    from: {
      pathname: string;
    };
};

export enum CommunicationActionStatus {
    idle = "idle",
    pending = "pending",
    fulfilled = "fulfilled",
    rejected = "rejected",
}

export interface CommunicationAction {
    type: string;
    status: CommunicationActionStatus;
    error: SerializedError | null;
}

export type CommunicationState = Array<CommunicationAction>;

export interface FeatureStateBase {
    data: object;
    communication: CommunicationState;
    session: object;
}

export const featureInitalStateBase: FeatureStateBase = {
    data: {},
    communication: [],
    session: {},
};

export const frontendURLs = {
    welcome: "/",
    about: "/about",
    signIn: "/signin",
    signUp: "/signup",
    signOut: "/signout",
    analyze: "/analyze",
    test: "/test",
    userAccount: "/u/:username",
    userProgress: "/u/:username/progress",
    userHistory: "/u/:username/history",
};
