import { ThunkAction } from "redux-thunk";
import {
  AuthAction,
  SET_ERROR,
  SET_LOADING,
  SET_SUCCESS,
  SET_USER,
  SET_USERS,
  SET_USER_CURRENT,
  SIGN_OUT,
  SignInData,
  SignUpData,
  USER,
} from "../action-type/auth.type";
import { RootState } from "../store";
import db from "../../../config/firebase";
import { COLLECTIONS } from "../../constants";
import { User } from "../../models/User";

// TODO: Create user
export const signup = (
  data: SignUpData,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const [usernameQuery, emailQuery] = await Promise.all([
        db
          .firestore()
          .collection(COLLECTIONS.USERS)
          .where("username", "==", data.username)
          .get(),
        db
          .firestore()
          .collection(COLLECTIONS.USERS)
          .where("email", "==", data.email)
          .get(),
      ]);
      if (!usernameQuery.empty) {
        dispatch(setError(`Tên đăng nhập ${data.username} đã tồn tại`));
        return;
      }
      if (!emailQuery.empty) {
        dispatch(setError(`Email ${data.email} đã được sử dụng`));
        return;
      }
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
        updatedAt: db.firestore.FieldValue.serverTimestamp(),
      };
      await userRef.set(userData);
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
          localStorage.setItem(USER, JSON.stringify(user));
          dispatch({
            type: SET_USER_CURRENT,
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
      localStorage.removeItem(USER);
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

// TODO: Get user
export const getUser = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    const userStr = localStorage.getItem(USER);
    if (userStr) {
      const user = JSON.parse(userStr);
      dispatch({
        type: SET_USER_CURRENT,
        payload: user,
      });
      return user;
    }
  };
};

// TODO: Update user
export const updateUser = (
  key: string,
  data: SignUpData,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const newData = {
        ...data,
        updatedAt: db.firestore.FieldValue.serverTimestamp(),
      };
      await db
        .firestore()
        .collection(COLLECTIONS.USERS)
        .doc(key)
        .update(newData);
      await getUserByKey(key);
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

// TODO: Get users
export const getUsers = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const usersRef = await db.firestore().collection(COLLECTIONS.USERS).get();
      const usersData = usersRef.docs.map((doc) => {
        const user = doc.data() as User;
        user.key = doc.id;
        return user;
      });
      dispatch({
        type: SET_USERS,
        payload: usersData,
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

// TODO: Get IP address
export const getIPAddress = () => {
  return new Promise((resolve, reject) => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => resolve(data.ip))
      .catch((error) => reject(error));
  });
};
