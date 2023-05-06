import { Permission } from "./Permission";
import { User } from "./User";

export interface Role {
  key: string;
  name: string;
  describe: string;
  users: User[] | null;
  permissions: Permission[];
  createAt: any;
  updatedAt: any;
}
