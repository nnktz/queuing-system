import { User } from "../state/action-type/auth.type";
import { PermissionType } from "./Permission.type";

export interface Role {
  key: string;
  name: string;
  describe: string;
  user: User[] | null;
  permission: PermissionType[];
  createAt?: any;
  updateAt?: any;
}
