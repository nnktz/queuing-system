import { PermissionItemType } from "./PermissionItem.type";

export interface PermissionType {
  key: string;
  name: string;
  items: PermissionItemType[];
}
