import { PermissionType } from "../../models/Permission.type";
import { Role } from "../../models/Role.type";
import { SET_ERROR, SET_LOADING, SET_SUCCESS, User } from "./auth.type";

export const SET_ROLE = "SET_ROLE";

export interface RoleUser {
  key: string;
  name: string;
  describe: string;
  permission: PermissionType[];
}

export interface RoleState {
  role: Role | null;
  loading: boolean;
  error: string;
  success: string;
}

export interface AddRoleData {
  key: string;
  name: string;
  describe: string;
  user: User[];
  permission: PermissionType[];
}

// TODO: Actions
interface SetRoleAction {
  type: typeof SET_ROLE;
  payload: Role;
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

export type RoleAction =
  | SetRoleAction
  | SetLoadingAction
  | SetErrorAction
  | SetSuccessAction;
