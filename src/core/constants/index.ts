export interface IAction {
  GET: string;
  UPDATE: string;
  ADD: string;
}

export const ACTION_MODAl: IAction = {
  GET: "GET",
  UPDATE: "UPDATE",
  ADD: "ADD",
};

export interface ICollection {
  USERS: string;
  DEVICES: string;
  SERVICES: string;
  QUEUES: string;
  PERMISSIONS: string;
  ROLES: string;
  AUDIT_LOGS: string;
  CUSTOMERS: string;
}

export const COLLECTIONS: ICollection = {
  USERS: "users",
  DEVICES: "devices",
  SERVICES: "services",
  QUEUES: "queues",
  PERMISSIONS: "permissions",
  ROLES: "roles",
  AUDIT_LOGS: "auditLogs",
  CUSTOMERS: "customers",
};

export const SECRET_KEY =
  "(.)nhatnguyen@24/08/2001?deptrainhatvutru:vktz119XDhihi##";
