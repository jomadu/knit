import { SerializedError } from "@reduxjs/toolkit";

export enum Status {
  idle = "idle",
  pending = "pending",
  fulfilled = "fulfilled",
  rejected = "rejected",
}

export type Error = SerializedError | string | null;

export interface EntityTable<T> {
  byId: Record<string | number, T>;
  allIds: Array<string | number>;
  status: Status;
  error: Error;
}
export function createEmptyEntityTable<T>(): EntityTable<T> {
  return {
    byId: {},
    allIds: [],
    status: Status.idle,
    error: null,
  };
}

export interface FeatureState {
  entities: object | null;
  session: object | null;
}

export const initialFeatureState: FeatureState = {
  entities: null,
  session: null,
};
