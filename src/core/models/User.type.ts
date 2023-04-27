import { Role } from "./Role.type";

export interface UserType {
  key: string;
  name: string;
  username: string;
  password: string;
  phone: string;
  email: string;
  role: Role;
  status: string;
}
