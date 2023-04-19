import { DeviceType } from "./Device.type";
import { ServiceType } from "./Service.type";

export interface QueueType {
  id: number;
  service: ServiceType;
  start_time: Date;
  end_time: Date;
  device: DeviceType;
  status: string;
}
