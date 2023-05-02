import {
  AuditLogAction,
  SET_AUDIT_LOG,
  SET_AUDIT_LOGS,
} from "./../action-type/auditLog.type";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import db from "../../../config/firebase";
import { AuditLog } from "../../models/AuditLog";
import { COLLECTIONS } from "../../constants";
import { SET_ERROR, USER } from "../action-type/auth.type";
import { getIPAddress } from "./authActions";

// TODO: Get audit logs
export const getAuditLogs = (): ThunkAction<
  void,
  RootState,
  null,
  AuditLogAction
> => {
  return async (dispatch) => {
    try {
      const auditLogsRef = await db
        .firestore()
        .collection(COLLECTIONS.AUDIT_LOGS)
        .orderBy("createAt", "desc")
        .get();
      const auditLogsData = auditLogsRef.docs.map((doc) => {
        const auditLog = doc.data() as AuditLog;
        auditLog.key = doc.id;
        return auditLog;
      });
      dispatch({
        type: SET_AUDIT_LOGS,
        payload: auditLogsData,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        dispatch({
          type: SET_ERROR,
          payload: error.message,
        });
      }
    }
  };
};

// TODO: Create audit log
export const createAuditLog = (
  msg: string,
  onError: () => void
): ThunkAction<void, RootState, null, AuditLogAction> => {
  return async (dispatch) => {
    try {
      const auditLogRef = await db
        .firestore()
        .collection(COLLECTIONS.AUDIT_LOGS)
        .doc();
      const key = auditLogRef.id;
      const userStr = localStorage.getItem(USER);
      const ipAddress = await getIPAddress();
      if (userStr) {
        const user = JSON.parse(userStr);
        const auditLogData: AuditLog = {
          key,
          user: user,
          note: msg,
          ip_address: ipAddress as string,
          createAt: db.firestore.FieldValue.serverTimestamp(),
        };
        await auditLogRef.set(auditLogData);
        dispatch({
          type: SET_AUDIT_LOG,
          payload: auditLogData,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        onError();
        dispatch({
          type: SET_ERROR,
          payload: error.message,
        });
      }
    }
  };
};
