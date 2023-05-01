import { User } from "../../models/User";
import { RoleUser } from "./role.type";

export const USER = "user";
export const SET_USER_CURRENT = "SET_USER_CURRENT";
export const SET_USER = "SET_USER";
export const SET_USERS = "SET_USERS";
export const UPDATE_USER = "UPDATE_USER";
export const SIGN_OUT = "SIGN_OUT";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const SET_SUCCESS = "SET_SUCCESS";
export const SET_TOKEN = "SET_TOKEN";

export interface AuthState {
  userCurrent: User | null;
  user: User | null;
  users: User[] | null;
  authenticated: boolean;
  loading: boolean;
  error: string;
  success: string;
}

export interface SignUpData {
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  role?: RoleUser;
  status: string;
}

export interface SignInData {
  username: string;
  password: string;
}

// TODO: Actions
interface SetUserCurrentAction {
  type: typeof SET_USER_CURRENT;
  payload: User;
}

interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}
interface SetUsersAction {
  type: typeof SET_USERS;
  payload: User[];
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface SignOutAction {
  type: typeof SIGN_OUT;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

interface SetSuccessAction {
  type: typeof SET_SUCCESS;
  payload: string;
}

interface SetTokenAction {
  type: typeof SET_TOKEN;
  payload: string;
}

export type AuthAction =
  | SetUserCurrentAction
  | SetUserAction
  | SetUsersAction
  | SetLoadingAction
  | SignOutAction
  | SetErrorAction
  | SetSuccessAction
  | SetTokenAction;
