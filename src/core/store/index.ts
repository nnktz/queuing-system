import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import breadcrumbReducer from "./reducers/breadcrumbReducer";
import authReducer from "./reducers/authReducer";
import roleReducer from "./reducers/roleReducer";
import auditLogReducer from "./reducers/auditLogReducer";
import serviceReducer from "./reducers/serviceReduce";
import deviceReducer from "./reducers/deviceReducer";
import queueReducer from "./reducers/queueReducer";

const rootReducer = combineReducers({
  breadcrumb: breadcrumbReducer,
  auth: authReducer,
  role: roleReducer,
  auditLog: auditLogReducer,
  service: serviceReducer,
  device: deviceReducer,
  queue: queueReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
