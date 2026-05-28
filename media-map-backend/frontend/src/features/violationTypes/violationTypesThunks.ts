import {createAsyncThunk} from "@reduxjs/toolkit";
import {ViolationTypeCreation, ViolationTypeMutation, ViolationTypeUpdate} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchViolationTypes = createAsyncThunk<ViolationTypeMutation[]>(
  'violationType/fetchAll',
  async () => {
    try {
      const {data} = await axiosApi.get<ViolationTypeMutation[]>('/violation-types');
      //
      // Need check for data
      //
      return data;
    } catch (e) {
      throw e;
    }
  }
);

export const createViolationType = createAsyncThunk<void, ViolationTypeCreation>(
  'violationType/create',
  async (body) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(body) as (keyof ViolationTypeCreation)[];

      keys.forEach((key) => {
        let value = body[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });

      await axiosApi.post('/violation-types', formData);
    } catch (e) {
      throw e;
    }
  }
);

export const updateViolationType = createAsyncThunk<ViolationTypeMutation, ViolationTypeUpdate>(
  'violationType/update',
  async (payload) => {
    try {
      const { id, icon, violationType } = payload as ViolationTypeUpdate;
      const dataToUpdate = { icon, violationType }
      const formData = new FormData();
      const keys = Object.keys(dataToUpdate) as (keyof ViolationTypeCreation)[];

      keys.forEach((key) => {
        let value = dataToUpdate[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });

      const {data} = await axiosApi.patch(`/violation-types/${id}`, formData);
      return data;
    } catch (e) {
      throw e;
    }
  }
)