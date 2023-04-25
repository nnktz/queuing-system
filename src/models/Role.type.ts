import { PermissionType } from "./Permission.type";
import { UserType } from "./User.type";

export type RoleType = {
  key: string;
  name: string;
  describe: string;
  user: UserType[];
  permission: PermissionType[];
};
