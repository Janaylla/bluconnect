import { useQuery } from "react-query";
import { api } from "../axios";
import { OutputData, QuerySearch } from "../../components/CompleteTable/completTable.type";
import { BusRoute } from "../busRoute/useBusRoute";

export interface User {
  id: number;
  code: string;
  busRoutes: BusRoute[];
}
const useGetListUser = ({ search, limit, page, order = '', searchs = {}, asc = 'asc' }: QuerySearch) => {
  return useQuery([`user`, search, limit, page, order, asc, Object.values(searchs)], async (): Promise<OutputData<User>> => {
    const response = await api.get("/user", {
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
export default useGetListUser;
