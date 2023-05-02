import { CustomerType } from "./Customer.type";
import { DeviceType } from "./Device.type";
import { Service } from "./Service";

export interface QueueType {
  id: number;
  customer: CustomerType | null;
  service: Service;
  start_time: Date;
  end_time: Date;
  device: DeviceType;
  status: string;
}
