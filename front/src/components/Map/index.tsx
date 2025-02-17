import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import * as L from "leaflet";
import { useEffect } from "react";

export interface SelectPointerProps {
  onChangePointer?: (p: { lat: number; lng: number }) => void;
}
interface MapComponentProps {
  waypoints: [number, number][];
  to?: LatLng;
  from?: LatLng;
}
const MapComponent = ({ waypoints, to, from }: MapComponentProps) => {
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
        <Marker position={from}>
        </Marker>
      )}
      <RoutingComponent waypoints={waypoints} />
    </MapContainer>
  );
};

const RoutingComponent = ({ waypoints }: { waypoints: [number, number][] }) => {
  const map = useMap();

  useEffect(() => {
    if (map && waypoints.length > 0) {
      // Remove camadas de roteamento existentes
      map.eachLayer((layer) => {
        if (layer instanceof L.Routing.Control) {
          map.removeLayer(layer);
        }
      });

      // Adiciona o controle de rota sem marcadores padrão
      const routingControl = L.Routing.control({
        waypoints: waypoints.map((point) => L.latLng(point[0], point[1])),
        lineOptions: {
          styles: [{ color: 'blue', weight: 4 }],
          extendToWaypoints: false,
          missingRouteTolerance: 1,
          addWaypoints: false,
        },
        routeWhileDragging: false,
        addWaypoints: false,
        show: false,
        formatter: new L.Routing.Formatter({
          distanceTemplate: '',
        }),
        collapsible: true,
        ...({
          createMarker: (() => null),
        })
      }).addTo(map);

      // Adiciona os círculos azuis manualmente
      waypoints.forEach((point) => {
        L.circleMarker([point[0], point[1]], {
          radius: 5, // Tamanho do círculo
          fillColor: 'blue', // Cor de preenchimento
          color: 'blue', // Cor da borda
          weight: 1, // Espessura da borda
          opacity: 1,
          fillOpacity: 1,
        }).addTo(map);
      });

      // Oculta o painel de rota
      const routePanel: any = document.querySelector('.leaflet-routing-container');
      if (routePanel) {
        routePanel.style.display = 'none';
      }

      // Função de limpeza
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
