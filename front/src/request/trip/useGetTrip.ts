import { useQuery } from 'react-query';
import { api } from '../axios';
import { Trip } from './useGetListTrip';

const getTrip = async (id: string): Promise<Trip | undefined> => {
  if (!id) return;
  const response = await api.get(`/trips/${id}`);
  return response.data;
};

export const useGetTrip = (id: string) => {
  return useQuery(['trip', id], () => getTrip(id));
};
