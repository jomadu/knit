import { LOCAL_STORAGE_ITEMS } from "../constants";
import {omit} from "lodash";

export const SIGN_OUT = "SIGN_OUT";
export const signOutRequestReducer = (state) => {
    localStorage.removeItem(LOCAL_STORAGE_ITEMS.JWT.ACCESS);
    localStorage.removeItem(LOCAL_STORAGE_ITEMS.JWT.REFRESH);
    return omit(state, ["jwt", "user"]);
};
