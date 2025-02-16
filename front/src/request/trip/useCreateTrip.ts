import { useMutation, useQueryClient } from "react-query";
import { api } from "../axios";
import { useToast } from "../../components/Toast/Toast";
import { TripBody } from "../../pages/trip/trip.type";

export const useCreateTrip = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation(
    async (data: TripBody) => {
      const response = await api.post("/trips", data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("trips");
        toast({
          title: "Rota de ônibus criada com sucesso",
          message: "A rota de ônibus foi criada com sucesso",
          type: "success",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Erro ao criar rota de ônibus",
          message: error.response.data.message,
          type: "error",
        });
      },
    }
  );
};
