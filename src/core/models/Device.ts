import { DeviceOptionData } from "../store/action-type/device.type";
import { DeviceCategory } from "./DeviceCategory";

export interface Device {
  key: string;
  name: string;
  ip_address: string;
  status_active: string;
  status_connection: string;
  service_use: DeviceOptionData[];
  username: string;
  password: string;
  category: DeviceCategory;
  createAt: any;
  updatedAt: any;
}
