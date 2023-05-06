import { Queue } from "./Queue";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  queues: Queue[];
  createAt: any;
  updatedAt: any;
}
