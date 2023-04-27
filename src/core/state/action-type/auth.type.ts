import { RoleUser } from "./role.type";

export const SET_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const SIGN_OUT = "SIGN_OUT";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const SET_SUCCESS = "SET_SUCCESS";
export const SET_TOKEN = "SET_TOKEN";

export interface User {
  key: string;
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  role: RoleUser | undefined;
  createAt: any;
  updateAt: any;
}

export interface AuthState {
  user: User | null;
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
  role: RoleUser | undefined;
  status: string;
}

export interface SignInData {
  username: string;
  password: string;
}

// TODO: Actions
interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
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
  | SetUserAction
  | SetLoadingAction
  | SignOutAction
  | SetErrorAction
  | SetSuccessAction
  | SetTokenAction;
