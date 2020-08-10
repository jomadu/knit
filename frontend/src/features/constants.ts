import { SerializedError } from "@reduxjs/toolkit";

export enum Status {
  idle = "idle",
  pending = "pending",
  fulfilled = "fulfilled",
  rejected = "rejected",
}

export type Error = SerializedError | string | null;

export interface EntityTable {
  byId: Record<string | number, object>;
  allIds: Array<string | number>;
  status: Status;
  error: Error;
}

export const initialEntityTable: EntityTable = {
  byId: {},
  allIds: [],
  status: Status.idle,
  error: null,
};

export interface FeatureState {
  entities: object | null;
  session: object | null;
}

export const initialFeatureState: FeatureState = {
  entities: null,
  session: null,
};
