import { Service } from "../../models/Service";
import { SET_ERROR, SET_LOADING, SET_SUCCESS } from "./auth.type";

export const SET_SERVICE = "SET_SERVICE";
export const SET_SERVICES = "SET_SERVICES";

export interface ServiceState {
  service: Service | null;
  services: Service[] | null;
  loading: boolean;
  error: string;
  success: string;
}

export interface ServiceQueueData {
  key: string;
  status: string;
  start_time: any;
  end_time: any;
}

export interface ServiceData {
  key: string;
  name: string;
  describe: string;
  queues?: ServiceQueueData[];
}

// TODO: Actions
interface SetServiceAction {
  type: typeof SET_SERVICE;
  payload: Service;
}

interface SetServicesAction {
  type: typeof SET_SERVICES;
  payload: Service[];
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

interface SetSuccessAction {
  type: typeof SET_SUCCESS;
  payload: string;
}

export type ServiceAction =
  | SetServiceAction
  | SetServicesAction
  | SetLoadingAction
  | SetErrorAction
  | SetSuccessAction;
