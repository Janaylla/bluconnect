import MapComponent, { SelectPointerProps } from "../../components/Map";
import { useEffect, useState } from "react";
import { Alert, Box } from "@mui/material";
import { Warning } from "@mui/icons-material";
import SelectAddress from "../../components/Select/SelectAddress";
import useBusRouteFromCoordinates from "../../request/busRoute/useBusRouteFromCoordinates";
import { LatLng } from "leaflet";
import { BusStop } from "../../request/busStop/useGetListBusStop";
import useBusRoute from "../../request/busRoute/useBusRoute";

const Home = () => {
  const [from, setFrom] = useState<BusStop | undefined>();
  const [to, setTo] = useState<BusStop | undefined>();

  const { data: routing } = useBusRoute({
    from_id: from?.id,
    to_id: to?.id
  })
  const [waypoints, setWaypoints] = useState<Array<[number, number]>>([]);
  useEffect(() => {
    if (routing) {
      const waypoints: Array<[number, number]> = routing?.map((route) => {
        return [route?.busStop?.latitude ?? 0, route?.busStop?.longitude ?? 0];
      });
      setWaypoints(waypoints);
    }
  }, [routing]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap="10px"
    >
      {/* Novo componente para escolher pontos com coordenadas */}
      <SelectAddress address={from} setAddress={setFrom} label=" De" />
      <SelectAddress address={to} setAddress={setTo} label="Para" />
      {
        !waypoints.length && to && from && (
          <Alert icon={<Warning fontSize="inherit" />} severity="warning">
            Não há viagens entre esses pontos
          </Alert>
        )
      }
      <MapComponent waypoints={waypoints}
        to={to ? new LatLng(to.latitude, to.longitude) : undefined}
        from={from ? new LatLng(from.latitude, from.longitude) : undefined}

      />
    </Box>
  );
};

export default Home;
