import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import {
  SET_SERVICE,
  SET_SERVICES,
  ServiceAction,
  ServiceData,
} from "../action-type/service.type";
import { SET_ERROR } from "../action-type/auth.type";
import { COLLECTIONS } from "../../constants";
import db from "../../../config/firebase";
import { Service } from "../../models/Service";
import { setError, setSuccess } from "./authActions";

// TODO: Get services
export const getServices = (): ThunkAction<
  void,
  RootState,
  null,
  ServiceAction
> => {
  return async (dispatch) => {
    try {
      const servicesRef = await db
        .firestore()
        .collection(COLLECTIONS.SERVICES)
        .get();
      const servicesData = servicesRef.docs.map((doc) => {
        const service = doc.data() as Service;
        service.key = doc.id;
        return service;
      });
      dispatch({
        type: SET_SERVICES,
        payload: servicesData,
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

export const getServiceActivation = (): ThunkAction<
  void,
  RootState,
  null,
  ServiceAction
> => {
  return async (dispatch) => {
    try {
      const servicesRef = await db
        .firestore()
        .collection(COLLECTIONS.SERVICES)
        .where("status_active", "==", "active")
        .get();
      const servicesData = servicesRef.docs.map((doc) => {
        const service = doc.data() as Service;
        service.key = doc.id;
        return service;
      });
      dispatch({
        type: SET_SERVICES,
        payload: servicesData,
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

// TODO: Create service
export const createService = (
  data: ServiceData,
  onError: () => void
): ThunkAction<void, RootState, null, ServiceAction> => {
  return async (dispatch) => {
    try {
      const key = data.key;
      const serviceRef = db
        .firestore()
        .collection(COLLECTIONS.SERVICES)
        .doc(key);
      const serviceDoc = await serviceRef.get();
      if (serviceDoc.exists) {
        dispatch(setError(`Đã tồn tại mã dịch vụ ${key}`));
        return;
      }
      const serviceData: Service = {
        key: key,
        name: data.name,
        describe: data.describe,
        status_active: "active",
        queue: [],
        createAt: db.firestore.FieldValue.serverTimestamp(),
        updatedAt: db.firestore.FieldValue.serverTimestamp(),
      };
      await serviceRef.set(serviceData);
      dispatch({
        type: SET_SERVICE,
        payload: serviceData,
      });
      dispatch(setSuccess("Thêm thành công"));
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

// TODO: Get service by key
export const getServiceByKey = (
  key: string
): ThunkAction<void, RootState, null, ServiceAction> => {
  return async (dispatch) => {
    try {
      const service = await db
        .firestore()
        .collection(COLLECTIONS.SERVICES)
        .doc(key)
        .get();
      if (service.exists) {
        const serviceData = service.data() as Service;
        dispatch({
          type: SET_SERVICE,
          payload: serviceData,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// TODO: Update service
export const updateService = (
  oldKey: string,
  newData: ServiceData,
  onError: () => void
): ThunkAction<void, RootState, null, ServiceAction> => {
  return async (dispatch) => {
    try {
      const oldDoc = await db
        .firestore()
        .collection(COLLECTIONS.SERVICES)
        .doc(oldKey)
        .get();
      if (oldDoc.exists) {
        const oldData = oldDoc.data() as Service;

        if (newData.key !== oldKey) {
          // Nếu thay đổi key thì tạo document mới và sao chép dữ liệu
          await db
            .firestore()
            .collection(COLLECTIONS.SERVICES)
            .doc(newData.key)
            .set({
              ...oldData,
              ...newData,
              key: newData.key,
              updatedAt: db.firestore.FieldValue.serverTimestamp(),
            });

          // Xóa document cũ
          await db
            .firestore()
            .collection(COLLECTIONS.SERVICES)
            .doc(oldKey)
            .delete();

          // Lấy dữ liệu từ document mới
          await getServiceByKey(newData.key);
        } else {
          // Nếu không thay đổi key thì cập nhật dữ liệu trong document cũ
          await db
            .firestore()
            .collection(COLLECTIONS.SERVICES)
            .doc(oldKey)
            .set({
              ...oldData,
              ...newData,
              updatedAt: db.firestore.FieldValue.serverTimestamp(),
            });

          // Lấy dữ liệu từ document cũ
          await getServiceByKey(oldKey);
        }

        dispatch(setSuccess("Cập nhật thành công"));
      }
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
