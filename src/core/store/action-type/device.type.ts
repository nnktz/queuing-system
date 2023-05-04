import { Device } from "../../models/Device";
import { DeviceCategory } from "../../models/DeviceCategory";
import { SET_ERROR, SET_LOADING, SET_SUCCESS } from "./auth.type";

export const SET_DEVICE = "SET_DEVICE";
export const SET_DEVICES = "SET_DEVICES";
export const SET_CATEGORIES = "SET_CATEGORIES";

export interface DeviceState {
  device: Device | null;
  devices: Device[] | null;
  categories: DeviceCategory[];
  loading: boolean;
  error: string;
  success: string;
}

export interface DeviceData {
  key: string;
  name: string;
  ip_address: string;
  service_use: DeviceOptionData[];
  username: string;
  password: string;
  category: DeviceCategory;
}

export interface DeviceOptionData {
  value: string;
  label: string;
}

// TODO: Actions
interface SetDeviceAction {
  type: typeof SET_DEVICE;
  payload: Device;
}

interface SetDevicesAction {
  type: typeof SET_DEVICES;
  payload: Device[];
}

interface SetCategoriesAction {
  type: typeof SET_CATEGORIES;
  payload: DeviceCategory[];
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

export type DeviceAction =
  | SetDeviceAction
  | SetDevicesAction
  | SetCategoriesAction
  | SetLoadingAction
  | SetErrorAction
  | SetSuccessAction;
