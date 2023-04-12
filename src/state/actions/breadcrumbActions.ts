import { BreadcrumbType } from "../action-type/breadcrumb.type";

export interface UpdateBreadcrumbItemsAction {
  type: "UPDATE_BREADCRUMB_ITEMS";
  payload: { items: BreadcrumbType[] };
}

export type BreadcrumbActionTypes = UpdateBreadcrumbItemsAction;
