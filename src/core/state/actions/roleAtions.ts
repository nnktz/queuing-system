import { ThunkAction } from "redux-thunk";
import { AddRoleData, RoleAction, SET_ROLE } from "../action-type/role.type";
import { RootState } from "../store";
import db from "../../../config/firebase";
import { COLLECTIONS } from "../../constants";
import { Role } from "../../models/Role.type";
import { SET_ERROR } from "../action-type/auth.type";

// TODO: Create role
export const createRole = (
  data: AddRoleData,
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
        user: null,
        permission: data.permission,
        createAt: db.firestore.FieldValue.serverTimestamp(),
        updateAt: db.firestore.FieldValue.serverTimestamp(),
      };
      await roleRef.set(roleData);
      dispatch({
        type: SET_ROLE,
        payload: roleData,
      });
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
