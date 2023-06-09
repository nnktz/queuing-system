import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import {
  DeviceAction,
  DeviceData,
  SET_CATEGORIES,
  SET_DEVICE,
  SET_DEVICES,
  SET_DEVICES_ACTIVE,
  SET_DEVICES_INACTIVE,
} from "../action-type/device.type";
import db from "../../../config/firebase";
import { COLLECTIONS } from "../../constants";
import { Device } from "../../models/Device";
import { SET_ERROR } from "../action-type/auth.type";
import { setError, setSuccess } from "./authActions";
import { Queue } from "../../models/Queue";
import { IOption } from "../../../components/dropdown/dropdown.type";

// TODO: Get devices
export const getDevices = (): ThunkAction<
  void,
  RootState,
  null,
  DeviceAction
> => {
  return async (dispatch) => {
    try {
      const devicesRef = await db
        .firestore()
        .collection(COLLECTIONS.DEVICES)
        .get();
      const devicesData = devicesRef.docs.map((doc) => {
        const device = doc.data() as Device;
        device.key = doc.id;
        return device;
      });
      dispatch({
        type: SET_DEVICES,
        payload: devicesData,
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

// TODO: Create device
export const createDevice = (
  data: DeviceData,
  onError: () => void
): ThunkAction<void, RootState, null, DeviceAction> => {
  return async (dispatch) => {
    try {
      const key = data.key;
      const serviceRef = db
        .firestore()
        .collection(COLLECTIONS.DEVICES)
        .doc(key);
      const serviceDoc = await serviceRef.get();
      if (serviceDoc.exists) {
        dispatch(setError(`Đã tồn tại mã thiết bị ${key}`));
        return;
      }
      const serviceData: Device = {
        key: key,
        name: data.name,
        ip_address: data.ip_address,
        username: data.username,
        password: data.password,
        service_use: data.service_use,
        category: data.category,
        status_active: "active",
        status_connection: "connect",
        createAt: db.firestore.FieldValue.serverTimestamp(),
        updatedAt: db.firestore.FieldValue.serverTimestamp(),
      };
      await serviceRef.set(serviceData);
      dispatch({
        type: SET_DEVICE,
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

// TODO: Get device categories
export const getDeviceCategories = (): ThunkAction<
  void,
  RootState,
  null,
  DeviceAction
> => {
  return async (dispatch) => {
    try {
      const categoriesRef = await db
        .firestore()
        .collection(COLLECTIONS.DEVICE_CATEGORIES)
        .get();
      const categoriesData = categoriesRef.docs.map((doc) => {
        const category = doc.data() as IOption;
        category.value = doc.id;
        return category;
      });
      dispatch({
        type: SET_CATEGORIES,
        payload: categoriesData,
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

// TODO: Get device by key
export const getDeviceByKey = (
  key: string
): ThunkAction<void, RootState, null, DeviceAction> => {
  return async (dispatch) => {
    try {
      const device = await db
        .firestore()
        .collection(COLLECTIONS.DEVICES)
        .doc(key)
        .get();
      if (device.exists) {
        const deviceData = device.data() as Device;
        dispatch({
          type: SET_DEVICE,
          payload: deviceData,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// TODO: Update device
export const updateDevice = (
  oldKey: string,
  newData: DeviceData,
  onError: () => void
): ThunkAction<void, RootState, null, DeviceAction> => {
  return async (dispatch) => {
    try {
      const oldDoc = await db
        .firestore()
        .collection(COLLECTIONS.DEVICES)
        .doc(oldKey)
        .get();
      if (oldDoc.exists) {
        const oldData = oldDoc.data() as Device;

        if (newData.key !== oldKey) {
          // Nếu thay đổi key thì tạo document mới và sao chép dữ liệu
          await db
            .firestore()
            .collection(COLLECTIONS.DEVICES)
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
            .collection(COLLECTIONS.DEVICES)
            .doc(oldKey)
            .delete();

          // Lấy dữ liệu từ document mới
          await dispatch(getDeviceByKey(newData.key));
        } else {
          // Nếu không thay đổi key thì cập nhật dữ liệu trong document cũ
          await db
            .firestore()
            .collection(COLLECTIONS.DEVICES)
            .doc(oldKey)
            .set({
              ...oldData,
              ...newData,
              updatedAt: db.firestore.FieldValue.serverTimestamp(),
            });

          // Lấy dữ liệu từ document cũ
          await dispatch(getDeviceByKey(oldKey));
        }

        // Kiểm tra nếu có hàng đợi chứa key của thiết bị thì cập nhật hàng đợi
        const queueRefs = await db
          .firestore()
          .collection(COLLECTIONS.QUEUES)
          .where("device.key", "==", oldKey)
          .get();
        if (queueRefs.size > 0) {
          const deviceData = {
            key: newData.key,
            name: newData.name,
          };
          queueRefs.forEach(async (doc) => {
            const queueData = doc.data() as Queue;
            await db
              .firestore()
              .collection(COLLECTIONS.QUEUES)
              .doc(doc.id)
              .set({
                ...queueData,
                device: deviceData,
              });
          });
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

// TODO: get quantity devices active
export const getQuantityDevicesActive = (): ThunkAction<
  void,
  RootState,
  null,
  DeviceAction
> => {
  return async (dispatch) => {
    try {
      const devicesRef = await db
        .firestore()
        .collection(COLLECTIONS.DEVICES)
        .where("status_active", "==", "active")
        .get();
      const quantity = devicesRef.size;
      dispatch({
        type: SET_DEVICES_ACTIVE,
        payload: quantity,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// TODO: get quantity devices inactive
export const getQuantityDevicesInactive = (): ThunkAction<
  void,
  RootState,
  null,
  DeviceAction
> => {
  return async (dispatch) => {
    try {
      const devicesRef = await db
        .firestore()
        .collection(COLLECTIONS.DEVICES)
        .where("status_active", "==", "inactive")
        .get();
      const quantity = devicesRef.size;
      dispatch({
        type: SET_DEVICES_INACTIVE,
        payload: quantity,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
