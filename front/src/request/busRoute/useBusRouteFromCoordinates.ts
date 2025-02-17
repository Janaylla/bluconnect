import { useQuery } from "react-query";
import { api } from "../axios";
import { OutputData } from "../../components/CompleteTable/completTable.type";

interface RouteParams {
  from_longitude?: number;
  from_latitude?: number;
  to_longitude?: number;
  to_latitude?: number;
}


const useGetListTravelSchedule = (params: RouteParams) => {
  return useQuery([`travelSchedule`], async (): Promise<any[]> => {
    const response = await api.get("/bus-routes/from-coordinates", {
      params,
    },);
    return response.data;
  }, {
    enabled: Boolean(params.from_latitude && params.from_longitude && params.to_latitude && params.to_longitude)
  });
};
export default useGetListTravelSchedule;
