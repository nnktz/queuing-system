import { SET_ERROR, SET_LOADING, SET_SUCCESS } from "../action-type/auth.type";
import {
  RoleAction,
  RoleState,
  SET_PERMISSIONS,
  SET_ROLE,
  SET_ROLES,
} from "../action-type/role.type";

const initialState: RoleState = {
  role: null,
  roles: null,
  permissions: [],
  loading: false,
  error: "",
  success: "",
};

const roleReducer = (state = initialState, action: RoleAction) => {
  switch (action.type) {
    case SET_ROLE:
      return {
        ...state,
        role: action.payload,
      };
    case SET_ROLES:
      return {
        ...state,
        roles: action.payload,
      };
    case SET_PERMISSIONS:
      return {
        ...state,
        permissions: action.payload,
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

export default roleReducer;
