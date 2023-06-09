import { IOption } from "../../../components/dropdown/dropdown.type";
import { Device } from "../../models/Device";
import { SET_ERROR, SET_LOADING, SET_SUCCESS } from "./auth.type";

export const SET_DEVICE = "SET_DEVICE";
export const SET_DEVICES = "SET_DEVICES";
export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_DEVICES_ACTIVE = "SET_DEVICES_ACTIVE";
export const SET_DEVICES_INACTIVE = "SET_DEVICES_INACTIVE";

export interface DeviceState {
  device: Device | null;
  devices: Device[] | null;
  devicesActive: number;
  devicesInactive: number;
  categories: IOption[];
  loading: boolean;
  error: string;
  success: string;
}

export interface DeviceData {
  key: string;
  name: string;
  ip_address: string;
  service_use: IOption[];
  username: string;
  password: string;
  category: IOption;
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

interface SetDevicesActiveAction {
  type: typeof SET_DEVICES_ACTIVE;
  payload: number;
}

interface SetDevicesInactiveAction {
  type: typeof SET_DEVICES_INACTIVE;
  payload: number;
}

interface SetCategoriesAction {
  type: typeof SET_CATEGORIES;
  payload: IOption[];
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
  | SetDevicesActiveAction
  | SetDevicesInactiveAction
  | SetCategoriesAction
  | SetLoadingAction
  | SetErrorAction
  | SetSuccessAction;
