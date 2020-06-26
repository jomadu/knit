import { merge } from "lodash";

export const CLOSE_DRAWER = "CLOSE_DRAWER";

export const closeDrawerReducer = (state) => {
    return merge({}, state, {
        drawerOpen: false,
    });
};
