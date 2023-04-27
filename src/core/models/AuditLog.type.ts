import { UserType } from "./User.type";

export interface AuditLogType {
  key: string;
  impact_time: Date;
  ip_address: string;
  note: string;
  user: UserType;
}
