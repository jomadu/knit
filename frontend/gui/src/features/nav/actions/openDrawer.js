import { merge } from "lodash";

export const OPEN_DRAWER = "OPEN_DRAWER";

export const openDrawerReducer = (state) => {
    return merge({}, state, {
        drawerOpen: true,
    });
};
