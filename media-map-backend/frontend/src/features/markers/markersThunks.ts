import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  ApproveMarker,
  MarkerBeforeModerator,
  MarkerBeforeModeratorMutation,
  MarkerOnMap,
  UpdateMarkerPayload
} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchMarkersBeforeMap = createAsyncThunk<MarkerBeforeModeratorMutation[]>(
  'markers/fetchAllBeforeMap',
  async () => {
    try {
      const {data} = await axiosApi.get<MarkerBeforeModeratorMutation[]>(`/markers?isApproved=${false}`);
      return data;
    } catch (e) {
      throw e;
    }
  }
);

export const fetchMarkersForMap = createAsyncThunk<MarkerOnMap[]>(
  'markers/fetchAllForMap',
  async () => {
    try {
      const { data } = await axiosApi.get<MarkerOnMap[]>(`/markers?isApproved=${true}`);
      return data;
    } catch (e) {
      throw e;
    }
  }
);

export const fetchOneMarker = createAsyncThunk<MarkerOnMap, number>(
  'markers/fetchOne',
  async (id) => {
    try {
      const {data} = await axiosApi.get<MarkerOnMap>(`/markers/${id}`);
      return data;
    } catch (e) {
      throw e;
    }
  }
);

export const createMarker = createAsyncThunk<void, MarkerBeforeModerator>(
  'markers/create',
  async (body) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(body) as (keyof MarkerBeforeModerator)[];

      keys.forEach((key) => {
        let value = body[key];

        if (value !== null) {
          if (key === 'violationTypeId') {
            formData.append(key, String(value)); // Явно приводим значение к строке
          } else {
            formData.append(key, value as string | Blob);
          }
        }
      });
      await axiosApi.post('/markers', formData);
    } catch (e) {
      throw e;
    }
  }
);

export const approveMarker = createAsyncThunk<void, ApproveMarker>(
  'markers/approve',
  async ({id, position, isApproved}) => {
    try {
      await axiosApi.patch(`/markers/${id}`, {position: JSON.stringify(position), isApproved});
    } catch (e) {
      throw e;
    }
  }
);

export const updateMarker = createAsyncThunk<void, UpdateMarkerPayload>(
  'markers/update',
  async (payload) => {
    try {
      const data = {...payload};

      const formData = new FormData();
      const keys = Object.keys(data) as (keyof UpdateMarkerPayload)[];

      keys.forEach((key) => {
          let value = data[key];

          if (value !== null) {
            if (key === 'position') {
              formData.append(key, JSON.stringify(value));
            } else {
              formData.append(key, value as string | Blob);
            }
          }
        }
      );
      await axiosApi.patch(`/markers/${data.id}`, formData);
    } catch
      (e) {
      throw e;
    }
  }
);

export const deleteMarker = createAsyncThunk<void, number>(
  'markers/approve',
  async (id) => {
    try {
      await axiosApi.delete(`/markers/${id}`);
    } catch (e) {
      throw e;
    }
  }
);