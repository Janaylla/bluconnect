import { useMutation, useQueryClient } from "react-query";
import { api } from "../axios";
import { useToast } from "../../components/Toast/Toast";
import { BusStopFormTemplate } from "../../pages/busStop/busStop.type";

export const useCreateBusStop = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation(
    async (data: BusStopFormTemplate) => {
      const response = await api.post("/bus-stops", data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("busRoutes");
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
