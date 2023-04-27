import { QueueType } from "./Queue.type";

export interface CustomerType {
  id: string;
  name: string;
  email: string;
  phone: string;
  queue: QueueType[];
}
