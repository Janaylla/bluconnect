import { useQuery } from "react-query";
import { api } from "../axios";
import { OutputData, QuerySearch } from "../../components/CompleteTable/completTable.type";
import { Trip } from "../trip/useGetListTrip";
export interface TravelSchedule {
  time: number;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  tripId: number;
  trip: Trip;
}
const useGetListTravelSchedule = ({ search, limit, page, order = '', searchs = {}, asc = 'asc' }: QuerySearch) => {
  return useQuery([`travelSchedule`, search, limit, page, order, asc, Object.values(searchs)], async (): Promise<OutputData<TravelSchedule>> => {
    const response = await api.get("/travel-schedule", {
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
export default useGetListTravelSchedule;
