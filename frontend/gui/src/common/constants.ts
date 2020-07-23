import { SerializedError } from "@reduxjs/toolkit";
import { StaticContext } from "react-router";
import { RouteComponentProps } from "react-router-dom";

export const backendBaseURL = "http://127.0.0.1:8000";

export enum CommunicationActionStatus {
    idle = "idle",
    pending = "pending",
    fulfilled = "fulfilled",
    rejected = "rejected",
}

export interface ICommunicationAction {
    type: string;
    status: CommunicationActionStatus;
    error: SerializedError | null;
}

export type CommunicationState = Array<ICommunicationAction>;

export interface IFeatureStateBase {
    data: object;
    communication: CommunicationState;
    session: object;
}

export const featureInitalStateBase: IFeatureStateBase = {
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
