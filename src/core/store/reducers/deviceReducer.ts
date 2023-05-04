import { SET_ERROR, SET_LOADING, SET_SUCCESS } from "../action-type/auth.type";
import {
  DeviceAction,
  DeviceState,
  SET_CATEGORIES,
  SET_DEVICE,
  SET_DEVICES,
} from "../action-type/device.type";

const initialState: DeviceState = {
  device: null,
  devices: null,
  categories: [],
  loading: false,
  error: "",
  success: "",
};

const deviceReducer = (state = initialState, action: DeviceAction) => {
  switch (action.type) {
    case SET_DEVICE:
      return {
        ...state,
        device: action.payload,
      };
    case SET_DEVICES:
      return {
        ...state,
        devices: action.payload,
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    default:
      return state;
  }
};

export default deviceReducer;
