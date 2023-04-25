import { RoleType } from "./Role.type";

export interface UserType {
  key: string;
  name: string;
  username: string;
  phone: string;
  password: string;
  email: string;
  role: RoleType;
  status: string;
}
