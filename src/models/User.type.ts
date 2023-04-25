import { RoleType } from "./Role.type";

export type UserType = {
  key: string;
  name: string;
  username: string;
  phone: string;
  password: string;
  email: string;
  role: RoleType;
  status: string;
};
