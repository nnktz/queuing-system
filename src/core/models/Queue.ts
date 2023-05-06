import { IOption } from "../../components/dropdown/dropdown.type";
import { DeviceData } from "../store/action-type/device.type";
import { Customer } from "./Customer";

export interface Queue {
  id: string;
  customer: Customer | null;
  service: IOption;
  end_time: any;
  device: DeviceData;
  status: string;
  createAt: any;
  updatedAt: any;
}
