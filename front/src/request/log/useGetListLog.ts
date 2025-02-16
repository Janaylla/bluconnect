import { useQuery } from "react-query";
import { api } from "../axios";
import { OutputData, QuerySearch } from "../../components/CompleteTable/completTable.type";
import { Log } from "../../components/Log/Log.types";

const useGetListLog = ({ search, limit, page, order = '', searchs = {}, asc = 'asc' }: QuerySearch) => {
  return useQuery([`log`, search, limit, page, order, asc, Object.values(searchs)], async (): Promise<OutputData<Log>> => {
    const response = await api.get("/log", {
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
export default useGetListLog;
