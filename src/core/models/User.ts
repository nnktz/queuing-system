import { RoleUser } from "../store/action-type/role.type";

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
  updatedAt: any;
}
