import { User } from "../state/action-type/auth.type";
import { PermissionType } from "./Permission.type";

export interface Role {
  key: string;
  name: string;
  describe: string;
  users: User[] | null;
  permissions: PermissionType[];
  createAt: any;
  updateAt: any;
}
