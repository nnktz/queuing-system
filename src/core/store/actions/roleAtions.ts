import { ThunkAction } from "redux-thunk";
import {
  RoleData,
  RoleAction,
  SET_PERMISSIONS,
  SET_ROLE,
  SET_ROLES,
} from "../action-type/role.type";
import { RootState } from "..";
import db from "../../../config/firebase";
import { COLLECTIONS } from "../../constants";
import { Role } from "../../models/Role";
import { SET_ERROR } from "../action-type/auth.type";
import { setError, setSuccess } from "./authActions";
import { Permission } from "../../models/Permission";
import { User } from "../../models/User";

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
        updatedAt: db.firestore.FieldValue.serverTimestamp(),
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
  username: string,
  roleKey: string,
  successMsg: string,
  onError: () => void
): ThunkAction<void, RootState, null, RoleAction> => {
  return async (dispatch) => {
    try {
      const userQuery = await db
        .firestore()
        .collection(COLLECTIONS.USERS)
        .where("username", "==", username)
        .get();
      if (userQuery.empty) {
        dispatch(
          setError(`Không tìm thấy người dùng với tên đăng nhập ${username}`)
        );
        return;
      }
      const userDoc = userQuery.docs[0];
      const user = userDoc.data() as User;
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

// TODO: Update user in role
export const updateUserInRole = (
  userKey: string,
  roleKey: string,
  successMsg: string,
  onError: () => void
): ThunkAction<void, RootState, null, RoleAction> => {
  return async (dispatch) => {
    try {
      // Kiểm tra xem role hiện tại đã chứa user với userKey hiện tại hay chưa
      const roleRef = db.firestore().collection(COLLECTIONS.ROLES).doc(roleKey);
      const roleDoc = await roleRef.get();
      if (!roleDoc.exists) {
        dispatch(setError("Vai trò không tồn tại"));
        return;
      }
      const roleData = roleDoc.data() as Role;
      const userExists = roleData.users?.some((user) => user.key === userKey);

      // Nếu user chưa tồn tại trong role, thêm thông tin của user vào role
      if (!userExists) {
        const userRef = db
          .firestore()
          .collection(COLLECTIONS.USERS)
          .doc(userKey);
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
          dispatch(setError("Người dùng không tồn tại"));
          return;
        }
        const userData = userDoc.data() as User;
        const updatedRoleData = {
          ...roleData,
          users: [...(roleData.users || []), userData],
          updatedAt: db.firestore.FieldValue.serverTimestamp(),
        };
        await roleRef.update(updatedRoleData);
        dispatch({
          type: SET_ROLE,
          payload: updatedRoleData,
        });
      } else {
        return;
      }

      // Kiểm tra các roles khác để xoá user đó khỏi role không thuộc rolekey của user
      const otherRolesRef = db
        .firestore()
        .collection(COLLECTIONS.ROLES)
        .where("key", "!=", roleKey);
      const otherRolesSnapshot = await otherRolesRef.get();
      const otherRolesData = otherRolesSnapshot.docs.map(
        (doc) => doc.data() as Role
      );
      const otherRolesWithUser = otherRolesData.filter((role) =>
        role.users?.some((user) => user.key === userKey)
      );
      for (const role of otherRolesWithUser) {
        const updatedRoleData = {
          ...role,
          users: role.users?.filter((user) => user.key !== userKey),
          updatedAt: db.firestore.FieldValue.serverTimestamp(),
        };
        await db
          .firestore()
          .collection(COLLECTIONS.ROLES)
          .doc(role.key)
          .update(updatedRoleData);
      }
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
        const permission = doc.data() as Permission;
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
      dispatch({
        type: SET_ROLES,
        payload: rolesData,
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

      // Step 1: Update role with data
      await db
        .firestore()
        .collection(COLLECTIONS.ROLES)
        .doc(key)
        .update(newData);

      // Step 2: Get users with same role key and update their role data
      const querySnapshot = await db
        .firestore()
        .collection(COLLECTIONS.USERS)
        .where("role.key", "==", key)
        .get();
      const usersToUpdate = querySnapshot.docs.map((doc) => doc.data() as User);
      const updatedUsers = usersToUpdate.map((user) => ({
        ...user,
        role: {
          key,
          ...data,
        },
      }));
      const userUpdatePromises = updatedUsers.map((user) =>
        db.firestore().collection(COLLECTIONS.USERS).doc(user.key).update(user)
      );
      await Promise.all(userUpdatePromises);

      // Step 3: Update role with updated user data
      await db
        .firestore()
        .collection(COLLECTIONS.ROLES)
        .doc(key)
        .update({ users: updatedUsers });

      await dispatch(getRoleByKey(key));
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
