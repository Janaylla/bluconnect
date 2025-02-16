import { useQuery } from "react-query";
import { api } from "../axios";
import { OutputData, QuerySearch } from "../../components/CompleteTable/completTable.type";

export interface BusStop {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}
const useGetListBusStop = ({ search, limit, page, order = '', searchs = {}, asc = 'asc' }: QuerySearch) => {
  return useQuery([`busStop`, search, limit, page, order, asc, Object.values(searchs)], async (): Promise<OutputData<BusStop>> => {
    const response = await api.get("/bus-stops", {
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
export default useGetListBusStop;
