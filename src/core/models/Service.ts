import { QueueType } from "./Queue.type";

export interface Service {
  key: string;
  name: string;
  describe: string;
  status_active: string;
  queue: QueueType[];
  createAt: any;
  updatedAt: any;
}
