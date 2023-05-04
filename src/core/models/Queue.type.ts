import { CustomerType } from "./Customer.type";
import { Device } from "./Device";
import { Service } from "./Service";

export interface QueueType {
  id: number;
  customer: CustomerType | null;
  service: Service;
  start_time: Date;
  end_time: Date;
  device: Device;
  status: string;
}
