import { useQuery } from 'react-query';
import { api } from '../axios';

const getTravelSchedule = async (id: string) => {
  if (!id) return;
  const response = await api.get(`/travel-schedule/${id}`);
  return response.data;
};

export const useGetTravelSchedule = (id: string) => {
  return useQuery(['travelSchedule', id], () => getTravelSchedule(id));
};
