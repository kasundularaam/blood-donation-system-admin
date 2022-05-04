import React, { useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import icon from "leaflet/dist/images/marker-icon.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
  iconAnchor: [15, 38],
  popupAnchor: [0, -40],
});

L.Marker.prototype.options.icon = DefaultIcon;

const LocationMarker = ({ onselectLocation }) => {
  const [position, setPosition] = useState(null);
  useMapEvents({
    click(e) {
      onselectLocation(e);
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Campaign location</Popup>
    </Marker>
  );
};

const MapView = ({ onselectLocation }) => {
  return (
    <MapContainer
      style={{ width: "100%", height: 250 }}
      center={[6.9271, 79.8612]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onselectLocation={onselectLocation} />
    </MapContainer>
  );
};

export default MapView;
