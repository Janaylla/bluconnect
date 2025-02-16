import { useQuery } from 'react-query';
import { api } from '../axios';

const getBusRoute = async (id: string) => {
  const response = await api.get(`/bus-routes/${id}`);
  return response.data;
};

export const useGetBusRoute = (id: string) => {
  return useQuery(['busRoute', id], () => getBusRoute(id));
};
