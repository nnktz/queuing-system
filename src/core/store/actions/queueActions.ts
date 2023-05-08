import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import {
  QueueAction,
  AddQueueData,
  SET_QUEUE,
  SET_QUEUES,
  SET_QUEUES_ABSENT,
  SET_QUEUES_FINISHED,
  SET_QUEUES_PROCESSING,
} from "../action-type/queue.type";
import db from "../../../config/firebase";
import { COLLECTIONS } from "../../constants";
import { Queue } from "../../models/Queue";
import { SET_ERROR, USER } from "../action-type/auth.type";
import { setSuccess } from "./authActions";
import { addDays, endOfWeek } from "date-fns";
import { ServiceQueueData } from "../action-type/service.type";
import {
  createAuditLog,
  createAuditLogWithoutLogging,
} from "./auditLogActions";

// TODO: Get queues
export const getQueues = (): ThunkAction<
  void,
  RootState,
  null,
  QueueAction
> => {
  return async (dispatch) => {
    try {
      const queuesRef = await db
        .firestore()
        .collection(COLLECTIONS.QUEUES)
        .get();
      const queuesData = queuesRef.docs.map((doc) => {
        const queue = doc.data() as Queue;
        queue.id = doc.id;
        return queue;
      });
      dispatch({
        type: SET_QUEUES,
        payload: queuesData,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        dispatch({
          type: SET_ERROR,
          payload: error.message,
        });
      }
    }
  };
};

// TODO: Create queue
export const createQueue = (
  data: AddQueueData,
  onError: () => void
): ThunkAction<void, RootState, null, QueueAction> => {
  return async (dispatch) => {
    try {
      const queuesRef = db.firestore().collection(COLLECTIONS.QUEUES);
      const queuesSnapshot = await queuesRef.get();
      const id = "201" + (queuesSnapshot.size + 1).toString().padStart(4, "0");
      const createAt = db.firestore.Timestamp.fromDate(new Date()).toDate();
      const updatedAt = db.firestore.Timestamp.fromDate(new Date()).toDate();
      const endOfWeekDate = endOfWeek(addDays(createAt, 1));
      endOfWeekDate.setHours(17, 30, 0, 0);
      const end_time = db.firestore.Timestamp.fromDate(endOfWeekDate).toDate();
      const queueData: Queue = {
        id,
        customer: null,
        service: data.service,
        device: data.device,
        status: "processing",
        end_time,
        createAt,
        updatedAt,
      };
      await queuesRef.doc(id).set(queueData);
      dispatch({
        type: SET_QUEUE,
        payload: queueData,
      });

      const serviceDocRef = db
        .firestore()
        .collection(COLLECTIONS.SERVICES)
        .doc(data.service.value);
      const serviceDoc = await serviceDocRef.get();
      if (serviceDoc.exists) {
        const updatedQueue: ServiceQueueData = {
          key: queueData.id,
          status: queueData.status,
          start_time: queueData.createAt,
          end_time: queueData.end_time,
        };

        await serviceDocRef.update({
          queues: db.firestore.FieldValue.arrayUnion(updatedQueue),
          updatedAt: db.firestore.FieldValue.serverTimestamp(),
        });
      }
      const login = localStorage.getItem(USER);
      if (login) {
        await dispatch(createAuditLog(`Cấp số hàng đợi ${queueData.id}`));
      } else {
        await dispatch(
          createAuditLogWithoutLogging(`Cấp số hàng đợi ${queueData.id}`)
        );
      }
      dispatch(setSuccess("In thành công"));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        onError();
        dispatch({
          type: SET_ERROR,
          payload: error.message,
        });
      }
    }
  };
};

// TODO: Get queue by id
export const getQueueById = (
  id: string
): ThunkAction<void, RootState, null, QueueAction> => {
  return async (dispatch) => {
    try {
      const queue = await db
        .firestore()
        .collection(COLLECTIONS.QUEUES)
        .doc(id)
        .get();
      if (queue.exists) {
        const queueData = queue.data() as Queue;
        dispatch({
          type: SET_QUEUE,
          payload: queueData,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// TODO: get quantity queues absent
export const getQuantityQueuesAbsent = (): ThunkAction<
  void,
  RootState,
  null,
  QueueAction
> => {
  return async (dispatch) => {
    try {
      const queuesRef = await db
        .firestore()
        .collection(COLLECTIONS.QUEUES)
        .where("status", "==", "absent")
        .get();
      const quantity = queuesRef.size;
      dispatch({
        type: SET_QUEUES_ABSENT,
        payload: quantity,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// TODO: get quantity queues finished
export const getQuantityQueuesFinished = (): ThunkAction<
  void,
  RootState,
  null,
  QueueAction
> => {
  return async (dispatch) => {
    try {
      const queuesRef = await db
        .firestore()
        .collection(COLLECTIONS.QUEUES)
        .where("status", "==", "finished")
        .get();
      const quantity = queuesRef.size;
      dispatch({
        type: SET_QUEUES_FINISHED,
        payload: quantity,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// TODO: get quantity queues processing
export const getQuantityQueuesProcessing = (): ThunkAction<
  void,
  RootState,
  null,
  QueueAction
> => {
  return async (dispatch) => {
    try {
      const queuesRef = await db
        .firestore()
        .collection(COLLECTIONS.QUEUES)
        .where("status", "==", "processing")
        .get();
      const quantity = queuesRef.size;
      dispatch({
        type: SET_QUEUES_PROCESSING,
        payload: quantity,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
