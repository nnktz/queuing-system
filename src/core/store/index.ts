import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import breadcrumbReducer from "./reducers/breadcrumbReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./reducers/authReducer";
import roleReducer from "./reducers/roleReducer";
import auditLogReducer from "./reducers/auditLogReducer";
import serviceReducer from "./reducers/serviceReduce";

const rootReducer = combineReducers({
  breadcrumb: breadcrumbReducer,
  auth: authReducer,
  role: roleReducer,
  auditLog: auditLogReducer,
  service: serviceReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
