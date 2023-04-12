import { BreadcrumbType } from "../action-type/breadcrumb.type";
import { BreadcrumbActionTypes } from "../actions/breadcrumbActions";

export interface BreadcrumbState {
  items: BreadcrumbType[];
}

const initialState: BreadcrumbState = {
  items: [],
};

const breadcrumbReducer = (
  state: BreadcrumbState = initialState,
  action: BreadcrumbActionTypes
): BreadcrumbState => {
  switch (action.type) {
    case "UPDATE_BREADCRUMB_ITEMS":
      return {
        ...state,
        items: action.payload.items,
      };
    default:
      return state;
  }
};

export default breadcrumbReducer;
