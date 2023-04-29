import { ThunkAction } from "redux-thunk";
import {
  RoleData,
  RoleAction,
  SET_PERMISSIONS,
  SET_ROLE,
  SET_ROLES,
} from "../action-type/role.type";
import { RootState } from "../store";
import db from "../../../config/firebase";
import { COLLECTIONS } from "../../constants";
import { Role } from "../../models/Role.type";
import { SET_ERROR, User } from "../action-type/auth.type";
import { setError, setSuccess } from "./authActions";
import { PermissionType } from "../../models/Permission.type";

// TODO: Create role
export const createRole = (
  data: RoleData,
  onError: () => void
): ThunkAction<void, RootState, null, RoleAction> => {
  return async (dispatch) => {
    try {
      const roleRef = await db.firestore().collection(COLLECTIONS.ROLES).doc();
      const key = roleRef.id;
      const roleData: Role = {
        key,
        name: data.name,
        describe: data.describe,
        users: null,
        permissions: data.permissions,
        createAt: db.firestore.FieldValue.serverTimestamp(),
        updateAt: db.firestore.FieldValue.serverTimestamp(),
      };
      await roleRef.set(roleData);
      dispatch({
        type: SET_ROLE,
        payload: roleData,
      });
      dispatch(setSuccess("Thêm thành công"));
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

// TODO: Add user in role
export const addUserInRole = (
  user: User,
  roleKey: string,
  successMsg: string,
  onError: () => void
): ThunkAction<void, RootState, null, RoleAction> => {
  return async (dispatch) => {
    try {
      const roleRef = db.firestore().collection(COLLECTIONS.ROLES).doc(roleKey);
      const roleDoc = await roleRef.get();
      if (!roleDoc.exists) {
        dispatch(setError("Vai trò không tồn tại"));
        return;
      }
      const roleData = roleDoc.data() as Role;
      const updatedRoleData = {
        ...roleData,
        users: [...(roleData.users || []), user],
        updateAt: db.firestore.FieldValue.serverTimestamp(),
      };
      await roleRef.update(updatedRoleData);
      dispatch({
        type: SET_ROLE,
        payload: updatedRoleData,
      });
      dispatch(setSuccess(successMsg));
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

// TODO: Get permissions
export const getPermissions = (): ThunkAction<
  void,
  RootState,
  null,
  RoleAction
> => {
  return async (dispatch) => {
    try {
      const permissionsRef = await db
        .firestore()
        .collection(COLLECTIONS.PERMISSIONS)
        .get();
      const permissionsData = permissionsRef.docs.map((doc) => {
        const permission = doc.data() as PermissionType;
        permission.key = doc.id;
        return permission;
      });
      localStorage.setItem(
        COLLECTIONS.PERMISSIONS,
        JSON.stringify(permissionsData)
      );
      const permissions = localStorage.getItem(COLLECTIONS.PERMISSIONS);
      if (permissions) {
        dispatch({
          type: SET_PERMISSIONS,
          payload: JSON.parse(permissions),
        });
      }
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

// TODO: Get roles
export const getRoles = (): ThunkAction<void, RootState, null, RoleAction> => {
  return async (dispatch) => {
    try {
      const rolesRef = await db.firestore().collection(COLLECTIONS.ROLES).get();
      const rolesData = rolesRef.docs.map((doc) => {
        const role = doc.data() as Role;
        role.key = doc.id;
        return role;
      });
      localStorage.setItem(COLLECTIONS.ROLES, JSON.stringify(rolesData));
      const roles = localStorage.getItem(COLLECTIONS.ROLES);
      if (roles) {
        dispatch({
          type: SET_ROLES,
          payload: JSON.parse(roles),
        });
      }
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

// TODO: Get role by key
export const getRoleByKey = (
  key: string
): ThunkAction<void, RootState, null, RoleAction> => {
  return async (dispatch) => {
    try {
      const role = await db
        .firestore()
        .collection(COLLECTIONS.ROLES)
        .doc(key)
        .get();
      if (role.exists) {
        const roleData = role.data() as Role;
        dispatch({
          type: SET_ROLE,
          payload: roleData,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// TODO: Update role
export const updateRole = (
  key: string,
  data: RoleData,
  onError: () => void
): ThunkAction<void, RootState, null, RoleAction> => {
  return async (dispatch) => {
    try {
      const newData = {
        ...data,
        updatedAt: db.firestore.FieldValue.serverTimestamp(),
      };
      await db
        .firestore()
        .collection(COLLECTIONS.ROLES)
        .doc(key)
        .update(newData);
      await getRoleByKey(key);
      dispatch(setSuccess("Cập nhật thành công"));
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
