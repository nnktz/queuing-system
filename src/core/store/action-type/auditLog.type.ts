import { AuditLog } from "../../models/AuditLog";
import { SET_ERROR, SET_LOADING, SET_SUCCESS } from "./auth.type";

export const SET_AUDIT_LOG = "SET_AUDIT_LOG";
export const SET_AUDIT_LOGS = "SET_AUDIT_LOGS";

export interface AuditLogState {
  auditLog: AuditLog | null;
  auditLogs: AuditLog[] | null;
  loading: boolean;
  error: string;
  success: string;
}

// TODO: Actions
interface SetAuditLogAction {
  type: typeof SET_AUDIT_LOG;
  payload: AuditLog;
}

interface SetAuditLogsAction {
  type: typeof SET_AUDIT_LOGS;
  payload: AuditLog[];
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

export type AuditLogAction =
  | SetAuditLogAction
  | SetAuditLogsAction
  | SetLoadingAction
  | SetErrorAction
  | SetSuccessAction;
