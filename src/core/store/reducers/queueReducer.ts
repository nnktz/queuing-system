import { SET_ERROR, SET_LOADING, SET_SUCCESS } from "../action-type/auth.type";
import {
  QueueAction,
  QueueState,
  SET_QUEUE,
  SET_QUEUES,
  SET_QUEUES_ABSENT,
  SET_QUEUES_FINISHED,
  SET_QUEUES_PROCESSING,
} from "../action-type/queue.type";

const initialState: QueueState = {
  queue: null,
  queues: null,
  queuesAbsent: 0,
  queuesFinished: 0,
  queuesProcessing: 0,
  loading: false,
  error: "",
  success: "",
};

const queueReducer = (state = initialState, action: QueueAction) => {
  switch (action.type) {
    case SET_QUEUE:
      return {
        ...state,
        queue: action.payload,
      };
    case SET_QUEUES:
      return {
        ...state,
        queues: action.payload,
      };
    case SET_QUEUES_ABSENT:
      return {
        ...state,
        queuesAbsent: action.payload,
      };
    case SET_QUEUES_FINISHED:
      return {
        ...state,
        queuesFinished: action.payload,
      };
    case SET_QUEUES_PROCESSING:
      return {
        ...state,
        queuesProcessing: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    default:
      return state;
  }
};

export default queueReducer;
