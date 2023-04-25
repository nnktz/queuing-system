import { PermissionType } from "./Permission.type";
import { UserType } from "./User.type";

export interface RoleType {
  key: string;
  name: string;
  describe: string;
  user: UserType[];
  permission: PermissionType[];
}
