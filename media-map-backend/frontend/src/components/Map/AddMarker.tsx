import React from "react";
import {useMapEvents} from "react-leaflet";
import {useAppDispatch} from "../../app/hooks/useAppDispatch";
import {clearMarkerToPin, selectOneMarker} from "../../features/markers/markersSlice";
import {useAppSelector} from "../../app/hooks/useAppSelector";
import {approveMarker, fetchMarkersForMap} from "../../features/markers/markersThunks";

const AddMarker: React.FC = () => {
  const dispatch = useAppDispatch();
  const markerToPin = useAppSelector(selectOneMarker);

  useMapEvents({
    click(e) {
      if (markerToPin) {
        if (window.confirm("Вы точно хотите добавить маркер на эту область?")) {
          const toUpdate = {
            id: markerToPin.id,
            position: e.latlng,
            isApproved: true,
          }
          dispatch(approveMarker(toUpdate)).then(() => {
            dispatch(fetchMarkersForMap());
          });
          dispatch(clearMarkerToPin());
        } else {
          console.log("Отмена действия");
        }
      } else {
        return null;
      }
    },
  });
  return null;
};

export default AddMarker;