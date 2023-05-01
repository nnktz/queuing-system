import { PermissionType } from "./Permission.type";
import { User } from "./User";

export interface Role {
  key: string;
  name: string;
  describe: string;
  users: User[] | null;
  permissions: PermissionType[];
  createAt: any;
  updatedAt: any;
}
