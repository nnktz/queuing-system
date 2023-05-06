import { IOption } from "../../../components/dropdown/dropdown.type";
import { Device } from "../../models/Device";
import { Queue } from "../../models/Queue";
import { SET_ERROR, SET_LOADING, SET_SUCCESS } from "./auth.type";

export const SET_QUEUE = "SET_QUEUE";
export const SET_QUEUES = "SET_QUEUES";

export interface QueueState {
  queue: Queue | null;
  queues: Queue[] | null;
  loading: boolean;
  error: string;
  success: string;
}

export interface AddQueueData {
  service: IOption;
  device: Device;
}

// TODO: Actions
interface SetQueueAction {
  type: typeof SET_QUEUE;
  payload: Queue;
}

interface SetQueuesAction {
  type: typeof SET_QUEUES;
  payload: Queue[];
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

interface SetSuccessAction {
  type: typeof SET_SUCCESS;
  payload: string;
}

export type QueueAction =
  | SetQueueAction
  | SetQueuesAction
  | SetLoadingAction
  | SetErrorAction
  | SetSuccessAction;
