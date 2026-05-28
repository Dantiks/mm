import {MarkerBeforeModeratorMutation, MarkerOnMap} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createMarker, fetchMarkersBeforeMap, fetchMarkersForMap, fetchOneMarker, updateMarker} from "./markersThunks";

export interface MarkerState {
  itemsApproved: MarkerOnMap[],
  itemsNotApproved: MarkerBeforeModeratorMutation[];
  item: MarkerOnMap | null;
  fetchAllLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
}

const initialState: MarkerState = {
  itemsApproved: [],
  itemsNotApproved: [],
  item: null,
  fetchAllLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  updateLoading: false,
};

export const markersSlice = createSlice({
  name: 'violation-type',
  initialState,
  reducers: {
    clearMarkerToPin: (state) => {
      state.item = null;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchMarkersForMap.pending, (state) => {
      state.fetchAllLoading = true;
    })
    .addCase(fetchMarkersForMap.rejected, (state) => {
      state.fetchAllLoading = false;
    })
    .addCase(fetchMarkersForMap.fulfilled, (state, { payload: filteredItems }) => {
      state.fetchAllLoading = false;
      state.itemsApproved = filteredItems;
    });

    builder
      .addCase(fetchMarkersBeforeMap.pending, (state) => {
        state.fetchAllLoading = true;
      })
      .addCase(fetchMarkersBeforeMap.rejected, (state) => {
        state.fetchAllLoading = false;
      })
      .addCase(fetchMarkersBeforeMap.fulfilled, (state, { payload: filteredItems }) => {
        state.fetchAllLoading = false;
        state.itemsNotApproved = filteredItems;
      });

    builder
      .addCase(fetchOneMarker.pending, (state) => {
        state.fetchOneLoading = true;
      })
      .addCase(fetchOneMarker.rejected, (state) => {
        state.fetchOneLoading = false;
      })
      .addCase(fetchOneMarker.fulfilled, (state, { payload: item}) => {
        state.fetchOneLoading = false;
        state.item = item;
      });

    builder
      .addCase(createMarker.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createMarker.rejected, (state) => {
        state.createLoading = false;
      })
      .addCase(createMarker.fulfilled, (state) => {
        state.createLoading = false;
      });

    builder
      .addCase(updateMarker.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateMarker.rejected, (state) => {
        state.updateLoading = false;
      })
      .addCase(updateMarker.fulfilled, (state) => {
        state.updateLoading = false;
      });
  }
});

export const markersReducer = markersSlice.reducer;
export const { clearMarkerToPin } = markersSlice.actions;

export const selectMarkersApproved = (state: RootState) => state.markers.itemsApproved;
export const selectMarkersNotApproved = (state: RootState) => state.markers.itemsNotApproved;
export const selectOneMarker = (state: RootState) => state.markers.item;
export const selectFetchMarkersLoading = (state: RootState) => state.markers.fetchAllLoading;
export const selectFetchOneMarkerLoading = (state: RootState) => state.markers.fetchOneLoading;
export const selectCreateMarkerLoading = (state: RootState) => state.markers.createLoading;
export const selectUpdateMarkerLoading = (state: RootState) => state.markers.updateLoading;