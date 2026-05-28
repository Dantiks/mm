import React, {useState} from 'react';
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {MarkerOnMap} from "../../types";
import AddMarker from "./AddMarker";
import {apiURL} from "../../utils/constants";
import PopUpSidebar from "../Sidebar/PopUpSidebar";

interface Props {
  markersApproved: MarkerOnMap[];
}

const MapComponent: React.FC<Props> = ({markersApproved}) => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerOnMap | null>(null);

  return (
    <div style={{ position: 'relative' }}>
        <MapContainer center={[41.2044, 74.7661]}
                      zoom={7}
                      scrollWheelZoom={true}
                      wheelPxPerZoomLevel={100}
                      // style={{ height: `calc(100dvh - (${HEADER_HEIGHT} + ${FOOTER_HEIGHT}))`}}
                      className="w-full h-[calc(100dvh-200px)] z-0">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            detectRetina={true}
          />
          <AddMarker />

          {markersApproved.map((marker, index) => {
            const iconUrl = `${apiURL}static/uploads/icons/${marker.violationType.icon}`;
            const customIcon = new L.Icon({
              iconUrl: iconUrl,
              iconSize: [45, 45],
              iconAnchor: [17, 45],
              popupAnchor: [1, -34],
              shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
              shadowSize: [41, 41]
            });
            return (
              <Marker key={index}
                      position={marker.position}
                      icon={customIcon}
                      eventHandlers={{
                        click: () => {
                          setSelectedMarker(marker);
                        }
                      }}
              />
            )
          })}
        </MapContainer>

      {/* Отображаем PopUpSidebar вне карты */}
      {selectedMarker && (
        <PopUpSidebar
          marker={selectedMarker}
          onClose={() => setSelectedMarker(null)}
        />
      )}
    </div>
  );
};

export default MapComponent;
