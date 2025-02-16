import { BusRoute } from "../../request/busRoute/useBusRoute";
import { BusStop } from "../../request/busStop/useGetListBusStop";
export interface TripForm {
  code: string;
  busStops: Record<string, {
    busStop: BusStop,
    avaregeTimePlus: number;
  }>;
}

export interface TripBody {
  code: string;
  routes: BusRoute[];
}

interface BusForm {
  label: string;
  required: boolean;
  type: "number" | "text" | "list";
  ignore?: boolean;
}
export const busForm: Record<keyof TripForm, BusForm> = {
  code: {
    label: "Nome",
    required: true,
    type: "text",
  },
  busStops: {
    label: "Bus Stops",
    required: true,
    type: "list",
    ignore: true,
  },
};
