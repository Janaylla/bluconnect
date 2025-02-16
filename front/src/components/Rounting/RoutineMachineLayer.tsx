import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { ControlOptions } from "leaflet";
interface RoutingMachineProps extends ControlOptions {
  waypoints: Array<[number, number]>;
}
const createRoutineMachineLayer = ({ waypoints }: RoutingMachineProps) => {
  console.log('createRoutineMachineLayer', waypoints);
  //   const waypoints = [
  //     [-26.9176083, -49.0592754],
  //     [-26.914261, -49.0582297],
  //   ];
  const instance = L.Routing.control({
    // waypoints: [
    //   L.latLng(to.x, to.y),
    //   L.latLng(from.x, from.y)
    // ],
    waypoints: waypoints.map((waypoint) => L.latLng(waypoint[0], waypoint[1])),
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
      extendToWaypoints: true,
      missingRouteTolerance: 100,
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
