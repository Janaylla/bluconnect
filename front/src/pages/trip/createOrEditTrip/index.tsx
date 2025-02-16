import React, { useEffect, useState } from "react";
import { Box, Button, TextField, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import SelectToAndFrom from "../../../components/Select/SelectToAndFrom";
import { Close } from "@mui/icons-material";
import { TripForm, busForm } from "../trip.type";
import { BusStop } from "../../../request/busStop/useGetListBusStop";
import { BusRoute } from "../../../request/busRoute/useBusRoute";
import { useGetTrip } from "../../../request/trip/useGetTrip";
import { useUpdateTrip } from "../../../request/trip/useUpdateTrip";
import { useCreateTrip } from "../../../request/trip/useCreateTrip";
import { HHMMToSeconds, secondsToHHMM } from "../../travelSchedule/travelSchedule.type";
import MapComponent from "../../../components/Map";

interface BusGenerator {
    key: string;
}

const busInit: BusGenerator = {
    key: new Date(0).getTime().toString(),
};
const busEnd: BusGenerator = {
    key: new Date(1).getTime().toString(),
};
const CreateOrEditTrip = () => {
    const { id } = useParams<{ id: string }>();

    const { data: initialTripData, isLoading } = useGetTrip(id as string);

    const [form, setForm] = useState<TripForm>({
        code: "",
        busStops: {},
    });

    const [waypoints, setWaypoints] = useState<[number, number][]>([]);

    const [listBusStop, setListBusStop] = useState<BusGenerator[]>([
        busInit,
        busEnd,
    ]);
    const [busStops, setBusStop] = useState<Record<string, BusStop>>({})
    const [avaregesTimePlus, setAvaregesTimePlus] = useState<Record<string, string>>({})
    useEffect(() => {
        if (initialTripData) {
            const busStops: Record<string, BusStop> = {};
            const avaregesTimePlus: Record<string, string> = {};
            const listBusStop: BusGenerator[] = [];
            initialTripData.busRoutes.forEach((route: BusRoute, index) => {
                const key = new Date(index).getTime().toString();
                if (route.busStop) {
                    busStops[key] = route.busStop
                    avaregesTimePlus[key] = secondsToHHMM(route.averageTimePlus);
                    listBusStop.push({ key });
                }

            });
            setForm({
                code: initialTripData.code,
                busStops: {},
            });
            setBusStop(busStops);
            setAvaregesTimePlus(avaregesTimePlus);
            setListBusStop(listBusStop);
        }
    }, [initialTripData]);

    useEffect(() => {
        const busStopsForm: Record<string, {
            busStop: BusStop,
            avaregeTimePlus: number;
        }> = {};
        for (const ge of listBusStop) {
            busStopsForm[ge.key] = {
                avaregeTimePlus: HHMMToSeconds(avaregesTimePlus[ge.key]),
                busStop: busStops[ge.key]
            }
        }
        setForm({
            ...form,
            busStops: busStopsForm,
        })
    }, [avaregesTimePlus, busStops])

    const addBusStop = () => {
        setListBusStop([
            ...listBusStop,
            {
                key: new Date().getTime().toString(),
            },
        ]);
    };

    const deleteBusStop = (index: number, busGenerator: BusGenerator) => {
        const newListBusStop = [...listBusStop];
        const newBusStops: Record<string, BusStop> = { ...busStops }
        const newAvaregesTimePlus: Record<string, string> = { ...avaregesTimePlus };

        delete newBusStops[busGenerator.key];
        delete newAvaregesTimePlus[busGenerator.key];
        newListBusStop.splice(index, 1);

        setListBusStop(newListBusStop);
        setAvaregesTimePlus(newAvaregesTimePlus)
        setBusStop(newBusStops)
    };

    const { mutate: updateTrip } = useUpdateTrip();
    const { mutate: createTrip } = useCreateTrip();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const busRoutes: BusRoute[] = [];

        for (let i = 0; i < listBusStop.length; i++) {
            const busStop = form.busStops[listBusStop[i].key];

            busRoutes.push({
                busStopId: busStop.busStop.id,
                index: i,
                averageTimePlus: busStop.avaregeTimePlus,
            });

        }

        if (id) {
            updateTrip({
                id: id as string,
                form: {
                    code: form.code,
                    routes: busRoutes,
                },
            });
        } else {
            createTrip({
                code: form.code,
                routes: busRoutes,
            });
        }
    };


    useEffect(() => {
        if (busStops) {
            const waypoints: Array<[number, number]> = Object.values(
                busStops
            )
                .filter((busStop) => busStop)
                .map((busStop) => [busStop.latitude, busStop.longitude])

            setWaypoints(waypoints);
        }
    }, [busStops]);

    if (isLoading && id) return <div>Carregando...</div>;


    return (
        <Box>
            <MapComponent waypoints={waypoints} />
            <form onSubmit={handleSubmit}>
                <Box marginY={2} gap={2} display={"flex"} flexDirection="column">
                    {Object.entries(busForm).map(
                        ([key, value]) =>
                            !value.ignore && (
                                <TextField
                                    fullWidth
                                    size="medium"
                                    key={key}
                                    id="outlined-basic"
                                    label={value.label}
                                    required={value.required}
                                    type={value.type}
                                    name={key}
                                    value={form[key as keyof TripForm]}
                                    onChange={handleChange}
                                />
                            )
                    )}

                    <Box marginY={0} gap={2} display={"flex"} flexDirection="column">
                        {listBusStop.map((busStop, index) => {
                            const value = busStops[busStop.key];
                            console.log("value", value)

                            return (
                                <Box
                                    display={"flex"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    key={busStop.key}
                                >
                                    <Box display={"flex"} gap={2} flexDirection={"row"} width={"100%"}>
                                        <Box flexGrow={1}>
                                            <SelectToAndFrom
                                                setValue={(newBusStop: BusStop | undefined) => {
                                                    if (newBusStop) {
                                                        setBusStop({ ...busStops, [busStop.key]: newBusStop })
                                                    }
                                                }}
                                                label={`Parada de ônibus ${index + 1}`}
                                                key={busStop.key}
                                                value={value}
                                            />
                                        </Box>
                                        <p style={
                                            {
                                                alignContent: 'center'
                                            }
                                        }>
                                            Tempo + <br />
                                            paradas
                                        </p>
                                        <Box >
                                            <TextField
                                                fullWidth
                                                size="medium"
                                                id="outlined-basic"
                                                required={true}
                                                type={'time'}
                                                onChange={
                                                    (e) => setAvaregesTimePlus({ ...avaregesTimePlus, [busStop.key]: e.target.value })
                                                }
                                                value={avaregesTimePlus[busStop.key]}
                                            />
                                        </Box>
                                    </Box>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => deleteBusStop(index, busStop)}
                                    >
                                        <Close />
                                    </IconButton>
                                </Box>
                            );
                        })}
                    </Box>

                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={2}
                    >
                        <Button size="large" variant="outlined" onClick={addBusStop}>
                            Adicionar Parada de Ônibus
                        </Button>
                        <Button size="large" type="submit" variant="contained">
                            Salvar
                        </Button>
                    </Box>
                </Box>
            </form>
        </Box>
    );
};

export default CreateOrEditTrip;
