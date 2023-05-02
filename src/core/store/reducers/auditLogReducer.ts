import {
  AuditLogAction,
  AuditLogState,
  SET_AUDIT_LOG,
  SET_AUDIT_LOGS,
} from "../action-type/auditLog.type";
import { SET_ERROR, SET_LOADING, SET_SUCCESS } from "../action-type/auth.type";

const initialState: AuditLogState = {
  auditLog: null,
  auditLogs: null,
  loading: false,
  error: "",
  success: "",
};

const auditLogReducer = (state = initialState, action: AuditLogAction) => {
  switch (action.type) {
    case SET_AUDIT_LOG:
      return {
        ...state,
        auditLog: action.payload,
      };
    case SET_AUDIT_LOGS:
      return {
        ...state,
        auditLogs: action.payload,
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

export default auditLogReducer;
