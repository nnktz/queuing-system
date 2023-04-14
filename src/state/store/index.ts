import { combineReducers, legacy_createStore as createStore } from "redux";
import breadcrumbReducer from "../reducers/breadcrumbReducer";

const rootReducer = combineReducers({
  breadcrumb: breadcrumbReducer,
});

const store = createStore(rootReducer);
export default store;
