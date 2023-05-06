import { SET_ERROR, SET_LOADING, SET_SUCCESS } from "../action-type/auth.type";
import {
  QueueAction,
  QueueState,
  SET_QUEUE,
  SET_QUEUES,
} from "../action-type/queue.type";

const initialState: QueueState = {
  queue: null,
  queues: null,
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
