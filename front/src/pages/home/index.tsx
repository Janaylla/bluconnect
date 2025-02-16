import MapComponent, { SelectPointerProps } from "../../components/Map";
import { useEffect, useState } from "react";
import { Alert, Box } from "@mui/material";
import { Warning } from "@mui/icons-material";
import SelectAddress from "../../components/Select/SelectAddress";
import { Address } from "../../request/test";
import { LatLng } from "leaflet";
import useBusRouteFromCoordinates from "../../request/busRoute/useBusRouteFromCoordinates";

const Home = () => {
  const [from, setFrom] = useState<Address | undefined>();
  const [to, setTo] = useState<Address | undefined>();
  const [selectPointer, setSelectPointer] = useState<SelectPointerProps>();

  const changeSelectPointer = (
    setToUndefined: React.Dispatch<React.SetStateAction<Address | undefined>>,
    setToSelectPointer: React.Dispatch<React.SetStateAction<Address | undefined>>,
    newValue?: Address
  ) => {
    if (to?.type === 'choice-in-map' && from?.type === 'choice-in-map') {
      setToUndefined(undefined);
    }
    if (newValue?.type === 'choice-in-map') {
      setSelectPointer({
        onChangePointer: (v) => setToSelectPointer({
          type: 'choice-in-map-selected',
          value: {
            latitude: v.lat,
            longitude: v.lng,
            name: 'Ponto selecionado: ' + v.lat + ';' + v.lng
          }
        }),
      })
    }
    if (to?.type !== 'choice-in-map' && from?.type !== 'choice-in-map') {
      setSelectPointer(undefined);
    }
  }
  useEffect(() => {
    changeSelectPointer(setFrom, setTo, to)
  }, [to])
  useEffect(() => {
    changeSelectPointer(setTo, setFrom, from)
  }, [from])

  // Usando o novo hook que chama o endpoint
  // const { data: routing, isLoading } = useBusRouteFromCoordinates({
  //   from: { latitude: from?.latitude ?? 0, longitude: from?.longitude ?? 0 },
  //   to: { latitude: to?.latitude ?? 0, longitude: to?.longitude ?? 0 },
  // });
  const { data: routing, isLoading } = useBusRouteFromCoordinates({
    from_latitude: from?.value?.latitude,
    from_longitude: from?.value?.longitude,
    to_latitude: to?.value?.latitude,
    to_longitude: to?.value?.longitude,
  })
  console.log('routing', routing)
  // const [waypoints, setWaypoints] = useState<Array<[number, number]>>([]);
  // useEffect(() => {
  //   if (routing) {
  //     const waypoints: Array<[number, number]> = routing.map((route) => {
  //       return [route?.busStop.latitude ?? 0, route?.busStop.longitude ?? 0];
  //     });
  //     setWaypoints(waypoints);
  //   }
  // }, [routing]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap="10px"
    >
      {/* Novo componente para escolher pontos com coordenadas */}
      <SelectAddress address={to} setAddress={setTo} label="De" />
      <SelectAddress address={from} setAddress={setFrom} label="Para" />
      {
        true && to && from && (
          <Alert icon={<Warning fontSize="inherit" />} severity="warning">
            Não há viagens entre esses pontos
          </Alert>
        )
      }
      <MapComponent waypoints={[]}
        selectPointer={selectPointer}
        to={to?.value ? new LatLng(to.value.latitude, to.value.longitude) : undefined}
        from={from?.value ? new LatLng(from.value.latitude, from.value.longitude) : undefined}

      />
    </Box>
  );
};

export default Home;
