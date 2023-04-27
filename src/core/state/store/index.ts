import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import breadcrumbReducer from "../reducers/breadcrumbReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "../reducers/authReducer";

const rootReducer = combineReducers({
  breadcrumb: breadcrumbReducer,
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
