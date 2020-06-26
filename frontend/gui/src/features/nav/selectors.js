import {createSelector} from 'reselect';

export const getDrawerOpen = createSelector((state) => state.nav.drawerOpen, (drawerOpen) => drawerOpen)