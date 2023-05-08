import { SET_ERROR, SET_LOADING, SET_SUCCESS } from "../action-type/auth.type";
import {
  SET_SERVICE,
  SET_SERVICES,
  SET_SERVICES_ACTIVE,
  SET_SERVICES_INACTIVE,
  ServiceAction,
  ServiceState,
} from "../action-type/service.type";

const initialState: ServiceState = {
  service: null,
  services: null,
  servicesActive: 0,
  servicesInActive: 0,
  loading: false,
  error: "",
  success: "",
};

const serviceReducer = (state = initialState, action: ServiceAction) => {
  switch (action.type) {
    case SET_SERVICE:
      return {
        ...state,
        service: action.payload,
      };
    case SET_SERVICES:
      return {
        ...state,
        services: action.payload,
      };
    case SET_SERVICES_ACTIVE:
      return {
        ...state,
        servicesActive: action.payload,
      };
    case SET_SERVICES_INACTIVE:
      return {
        ...state,
        servicesInActive: action.payload,
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

export default serviceReducer;
