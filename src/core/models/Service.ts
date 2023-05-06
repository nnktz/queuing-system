import { ServiceQueueData } from "../store/action-type/service.type";

export interface Service {
  key: string;
  name: string;
  describe: string;
  status_active: string;
  queues: ServiceQueueData[];
  createAt: any;
  updatedAt: any;
}
