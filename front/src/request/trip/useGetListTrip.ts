import { useQuery } from "react-query";
import { api } from "../axios";
import { OutputData, QuerySearch } from "../../components/CompleteTable/completTable.type";
import { BusRoute } from "../busRoute/useBusRoute";

export interface Trip {
  id: number;
  code: string;
  busRoutes: BusRoute[];
}
const useGetListTrip = ({ search, limit, page, order = '', searchs = {}, asc = 'asc' }: QuerySearch) => {
  return useQuery([`trip`, search, limit, page, order, asc, Object.values(searchs)], async (): Promise<OutputData<Trip>> => {
    const response = await api.get("/trips", {
      params: {
        search,
        limit,
        page,
        order,
        asc,
        ...searchs
      },
    });
    return response.data;
  });
};
export default useGetListTrip;
