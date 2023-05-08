import { IOption } from "../../../components/dropdown/dropdown.type";
import { Device } from "../../models/Device";
import { Queue } from "../../models/Queue";
import { SET_ERROR, SET_LOADING, SET_SUCCESS } from "./auth.type";

export const SET_QUEUE = "SET_QUEUE";
export const SET_QUEUES = "SET_QUEUES";
export const SET_QUEUES_ABSENT = "SET_QUEUES_ABSENT";
export const SET_QUEUES_FINISHED = "SET_QUEUES_FINISHED";
export const SET_QUEUES_PROCESSING = "SET_QUEUES_PROCESSING";

export interface QueueState {
  queue: Queue | null;
  queues: Queue[] | null;
  queuesAbsent: number;
  queuesFinished: number;
  queuesProcessing: number;
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

interface SetQueuesAbsentAction {
  type: typeof SET_QUEUES_ABSENT;
  payload: number;
}

interface SetQueuesFinishedAction {
  type: typeof SET_QUEUES_FINISHED;
  payload: number;
}

interface SetQueuesProcessingAction {
  type: typeof SET_QUEUES_PROCESSING;
  payload: number;
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
  | SetQueuesAbsentAction
  | SetQueuesFinishedAction
  | SetQueuesProcessingAction
  | SetLoadingAction
  | SetErrorAction
  | SetSuccessAction;
