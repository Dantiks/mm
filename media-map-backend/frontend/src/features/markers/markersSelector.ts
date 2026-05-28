import { createSelector } from '@reduxjs/toolkit';
import {ViolationTypeMutation} from "../../types";
import {selectMarkersApproved} from "./markersSlice";

export const selectFilteredMarkers = (violationTypes: ViolationTypeMutation[]) => {
  return createSelector(
    selectMarkersApproved,
    (itemsApproved) => {
      const arrayWithId = violationTypes.map(item => item.id);
      return itemsApproved.filter(marker => arrayWithId.includes(marker.violationTypeId));
    }
  );
};