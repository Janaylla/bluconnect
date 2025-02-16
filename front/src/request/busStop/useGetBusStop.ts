import { useQuery } from 'react-query';
import { api } from '../axios';
import { BusStop } from './useGetListBusStop';

const getBusStop = async (id: string): Promise<BusStop | undefined> => {
  if(!id) return;
  const response = await api.get(`/bus-stops/${id}`);
  return response.data;
};

export const useGetBusStop = (id: string) => {
  return useQuery(['busStop', id], () => getBusStop(id));
};
