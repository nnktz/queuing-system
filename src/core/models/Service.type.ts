import { QueueType } from "./Queue.type";

export interface ServiceType {
  key: string;
  name: string;
  describe: string;
  status_active: string;
  queue: QueueType[];
}
