import { User } from "./User";

export interface AuditLog {
  key: string;
  user?: User;
  system: boolean;
  note: string;
  ip_address: string;
  createAt: any;
}
