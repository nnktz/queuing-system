import { ThunkAction } from "redux-thunk";
import {
  AuthAction,
  SET_ERROR,
  SET_LOADING,
  SET_SUCCESS,
  SET_USER,
  SIGN_OUT,
  SignInData,
  SignUpData,
  User,
} from "../action-type/auth.type";
import { RootState } from "../store";
import db from "../../../config/firebase";
import { COLLECTIONS } from "../../constants";

// TODO: Create user
export const signup = (
  data: SignUpData,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const userRef = await db.firestore().collection(COLLECTIONS.USERS).doc();
      const key = userRef.id;
      const userData: User = {
        key,
        name: data.name,
        email: data.email,
        username: data.username,
        password: data.password,
        phone: data.phone,
        role: data.role,
        status: data.status,
        createAt: db.firestore.FieldValue.serverTimestamp(),
        updateAt: db.firestore.FieldValue.serverTimestamp(),
      };
      await userRef.set(userData);
      dispatch({
        type: SET_USER,
        payload: userData,
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

// TODO: Get user by key
export const getUserByKey = (
  key: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const user = await db
        .firestore()
        .collection(COLLECTIONS.USERS)
        .doc(key)
        .get();
      if (user.exists) {
        const userData = user.data() as User;
        dispatch({
          type: SET_USER,
          payload: userData,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// TODO:Login
export const signin = (
  data: SignInData,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const querySnapshot = await db
        .firestore()
        .collection(COLLECTIONS.USERS)
        .where("username", "==", data.username)
        .limit(1)
        .get();
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const user = userDoc.data() as User;
        const isValidPassword = user.password === data.password;
        if (isValidPassword) {
          localStorage.setItem(COLLECTIONS.USERS, JSON.stringify(user));
          dispatch({
            type: SET_USER,
            payload: user,
          });
          return user;
        } else {
          throw new Error("Invalid password");
        }
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        onError();
        dispatch(setError(error.message));
      }
    }
  };
};

// TODO: Logout
export const signout = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await db.auth().signOut();
      localStorage.removeItem(COLLECTIONS.USERS);
      dispatch({
        type: SIGN_OUT,
      });
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };
};

// TODO: Set loading
export const setLoading = (
  value: boolean
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING,
      payload: value,
    });
  };
};

// TODO: Set error
export const setError = (
  msg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_ERROR,
      payload: msg,
    });
  };
};

// TODO: Set success
export const setSuccess = (
  msg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_SUCCESS,
      payload: msg,
    });
  };
};

// TODO: Reset password
export const resetPassword = (
  email: string,
  password: string,
  successMsg: string,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const usersRef = db.firestore().collection(COLLECTIONS.USERS);
      const query = usersRef.where("email", "==", email).limit(1);
      const querySnapshot = await query.get();
      if (querySnapshot.empty) {
        dispatch(setError("Email không tồn tại"));
        return;
      }
      const userDoc = querySnapshot.docs[0];
      const user = userDoc.data() as User;
      if (user.password === password) {
        dispatch(setError("Mật khẩu mới trùng với mật khẩu cũ"));
        return;
      }
      await usersRef.doc(userDoc.id).update({
        password: password,
        updateAt: db.firestore.FieldValue.serverTimestamp(),
      });
      dispatch(setSuccess(successMsg));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        onError();
        dispatch(setError(error.message));
      }
    }
  };
};

// TODO: Get email from firestore
export const getEmail = (
  email: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const usersRef = db.firestore().collection(COLLECTIONS.USERS);
      const query = usersRef.where("email", "==", email).limit(1);
      const querySnapshot = await query.get();
      if (querySnapshot.empty) {
        dispatch(setError("Email không tồn tại"));
        return false;
      }
      return true;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        dispatch(setError(error.message));
      }
    }
  };
};

// TODO: Get user from localStorage
export const getUserFromLocalStorage = (): ThunkAction<
  void,
  RootState,
  null,
  AuthAction
> => {
  return (dispatch) => {
    const user = localStorage.getItem(COLLECTIONS.USERS);
    if (user) {
      dispatch({
        type: SET_USER,
        payload: JSON.parse(user),
      });
    }
  };
};
