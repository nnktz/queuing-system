import { Permission } from "../../models/Permission";
import { Role } from "../../models/Role";
import { SET_ERROR, SET_LOADING, SET_SUCCESS } from "./auth.type";

export const SET_ROLE = "SET_ROLE";
export const SET_ROLES = "SET_ROLES";
export const SET_PERMISSIONS = "SET_PERMISSIONS";

export interface RoleUser {
  key: string;
  name: string;
  describe: string;
  permissions: Permission[];
}

export interface RoleState {
  role: Role | null;
  roles: Role[] | null;
  permissions: Permission[];
  loading: boolean;
  error: string;
  success: string;
}

export interface RoleData {
  name: string;
  describe: string;
  permissions: Permission[];
}

// TODO: Actions
interface SetRoleAction {
  type: typeof SET_ROLE;
  payload: Role;
}

interface SetRolesAction {
  type: typeof SET_ROLES;
  payload: Role[];
}

interface SetPermissionsAction {
  type: typeof SET_PERMISSIONS;
  payload: Permission[];
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
  | SetRolesAction
  | SetPermissionsAction
  | SetLoadingAction
  | SetErrorAction
  | SetSuccessAction;
