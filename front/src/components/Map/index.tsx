import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import * as L from "leaflet";
import { useEffect } from "react";

export interface SelectPointerProps {
  onChangePointer?: (p: { lat: number; lng: number }) => void;
}
const SelectPointer = ({ onChangePointer }: SelectPointerProps) => {
  const ClickHandler = () => {
    useMapEvents({
      click(e) {
        onChangePointer && onChangePointer({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        });
      },
    });
    return null;
  }
  return <>
    <ClickHandler />
  </>
}
interface MapComponentProps {
  waypoints: [number, number][];
  to?: LatLng;
  from?: LatLng;
  selectPointer?: SelectPointerProps;
}
const MapComponent = ({ waypoints, selectPointer, to, from }: MapComponentProps) => {
  const position = new LatLng(-26.9334, -48.9538);

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{
        height: "70vh",
        backgroundImage:
          "url(https://www.transparenttextures.com/patterns/axiom-pattern.png)",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {to && (
        <Marker position={to}>
        </Marker>
      )}
      {from && (
        <Marker  position={from}>
        </Marker>
      )}
      <RoutingComponent waypoints={waypoints} />
      {selectPointer && <SelectPointer {...selectPointer} />}
    </MapContainer>
  );
};


const RoutingComponent = ({ waypoints }: { waypoints: [number, number][] }) => {
  const map = useMap();

  useEffect(() => {
    if (map && waypoints.length > 0) {
      map.eachLayer((layer) => {
        if (layer instanceof L.Routing.Control) {
          map.removeLayer(layer);
        }
      });

      const routingControl = L.Routing.control({
        waypoints: waypoints.map(
          (point) => L.latLng(point[0], point[1])
        ),
        lineOptions: {
          styles: [{ color: 'blue', weight: 4 }],
          extendToWaypoints: false,
          missingRouteTolerance: 1
        },
        routeWhileDragging: false,
        addWaypoints: false,
        show: false,
        formatter: new L.Routing.Formatter({
          distanceTemplate: '',
        }),
        collapsible: true,
      }).addTo(map);

      const routePanel: any = document.querySelector('.leaflet-routing-container');
      if (routePanel) {
        routePanel.style.display = 'none';
      }
      return () => {
        if (map && routingControl) {
          map.removeControl(routingControl);
        }
      };
    }
  }, [map, waypoints]);
  return null;
};


export default MapComponent;
