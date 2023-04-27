import { BreadcrumbType } from "../action-type/breadcrumb.type";

export const UPDATE_BREADCRUMB_ITEMS = "UPDATE_BREADCRUMB_ITEMS";

interface UpdateBreadcrumbItemsAction {
  type: typeof UPDATE_BREADCRUMB_ITEMS;
  payload: { items: BreadcrumbType[] };
}

export type BreadcrumbActionTypes = UpdateBreadcrumbItemsAction;

export const updateBreadcrumbItems = (
  items: BreadcrumbType[]
): UpdateBreadcrumbItemsAction => ({
  type: UPDATE_BREADCRUMB_ITEMS,
  payload: { items },
});
