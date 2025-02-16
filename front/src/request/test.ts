import { useQuery } from "react-query";
import { OutputData, QuerySearch } from "../components/CompleteTable/completTable.type";
import axios from "axios";
import { api } from "./axios";
import { BusStop } from "./busStop/useGetListBusStop";
export interface AddressSearch {
    lat: string;
    lon: string;
    display_name: string;
    address: {
        road: string;
        suburb: string;
        city: string;
        state: string;
        country: string;
        country_code: string;
    }
}
interface AddressPoint {
    name: string;
    latitude: number;
    longitude: number;
}
export type Address = {
    type: 'choice-in-map',
    value: null
} | {
    type: 'choice-in-map-selected' | 'address' | 'bus-stop',
    value: AddressPoint
}

const useGetListAdress = ({ search, limit, page, order = '', searchs = {}, asc = 'asc' }: QuerySearch) => {
    return useQuery([`user`, search], async (): Promise<OutputData<Address>> => {
        const rows: Address[] = []
        if (!search) {
            rows.push({
                type: 'choice-in-map',
                value: null
            })
        }

        const responseBusStops: { data: OutputData<BusStop> } = await api.get("/bus-stops", {
            params: {
                search,
                limit,
                page,
                order,
                asc,
                ...searchs
            },
        });

        const busRoute: Address[] = responseBusStops.data.rows.map((bus) => ({
            type: 'bus-stop',
            value: bus
        }));
        const query = `${encodeURIComponent(search)}, Blumenau, Gaspar, Santa Catarina, Brasil`;
        const url = `https://nominatim.openstreetmap.org/search`;

        const responseAddressSearch: AddressSearch[] = await axios.get(url, {
            params: {
                q: query,
                countrycodes: 'BR',
                format: 'json',
                addressdetails: 1,
                limit: +limit - busRoute.length,
                extratags: 1,
                polygon_geojson: 1,
                type: 'area,way,node',
                'accept-language': 'pt-BR'
            }
        }).then((r) => r.data).catch(() => []);

        const addressSearch: Address[] = responseAddressSearch.map((adr: AddressSearch) => {
            const addressDetails = adr.address;
            const label = `${addressDetails.road || ''}, ${addressDetails.suburb || ''}, ${addressDetails.city || ''}, ${addressDetails.state || ''}, ${addressDetails.country || ''}`;
            return {
                type: 'address',
                value: {
                    latitude: +adr.lat,
                    longitude: +adr.lon,
                    name: label,
                },
            }
        })

        rows.push(...busRoute, ...addressSearch)

        return {
            count: responseAddressSearch.length + responseBusStops.data.count,
            rows,
        }
    });
};
export default useGetListAdress;
