import {ViolationTypeMutation} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createViolationType, fetchViolationTypes, updateViolationType} from "./violationTypesThunks";

export interface ViolationTypeState {
  items: ViolationTypeMutation[];
  fetchAllLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
}

const initialState: ViolationTypeState = {
  items: [],
  fetchAllLoading: false,
  createLoading: false,
  updateLoading: false,
};

export const violationTypesSlice = createSlice({
  name: 'violation-type',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchViolationTypes.pending, (state) => {
        state.fetchAllLoading = true;
      })
      .addCase(fetchViolationTypes.rejected, (state) => {
        state.fetchAllLoading = false;
      })
      .addCase(fetchViolationTypes.fulfilled, (state, { payload: filteredItems }) => {
        state.fetchAllLoading = false;
        state.items = filteredItems;
      });

    builder
      .addCase(createViolationType.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createViolationType.rejected, (state) => {
        state.createLoading = false;
      })
      .addCase(createViolationType.fulfilled, (state) => {
        state.createLoading = false;
      });

    builder
      .addCase(updateViolationType.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateViolationType.rejected, (state) => {
        state.updateLoading = false;
      })
      .addCase(updateViolationType.fulfilled, (state) => {
        state.updateLoading = false;
      });
  }
});

export const violationTypesReducer = violationTypesSlice.reducer;

export const selectViolationTypes = (state: RootState) => state.violationTypes.items;
export const selectFetchingViolationTypesLoading = (state: RootState) => state.violationTypes.fetchAllLoading;
export const selectCreateViolationTypeLoading = (state: RootState) => state.violationTypes.createLoading;
