import { PermissionType } from "./Permission.type";
import { PersonProps } from "./Person.type";

export type RoleType = {
  key: string;
  name: string;
  describe: string;
  user: PersonProps[];
  permission: PermissionType[];
};
