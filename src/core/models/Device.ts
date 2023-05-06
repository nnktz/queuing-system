import { IOption } from "../../components/dropdown/dropdown.type";

export interface Device {
  key: string;
  name: string;
  ip_address: string;
  status_active: string;
  status_connection: string;
  service_use: IOption[];
  username: string;
  password: string;
  category: IOption;
  createAt: any;
  updatedAt: any;
}
