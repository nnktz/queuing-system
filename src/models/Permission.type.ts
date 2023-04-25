import { PermissionItemType } from "./PermissionItem.type";

export type PermissionType = {
  key: string;
  name: string;
  items: PermissionItemType[];
};
