import { useMutation, useQueryClient } from "react-query";
import { api } from "../axios";
import { useToast } from "../../components/Toast/Toast";
import { BusRouteForm } from "../../pages/busRoute/busRoute.type";

export const useCreateBusRoute = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation(
    async (data: BusRouteForm) => {
      const response = await api.post("/bus-routes", data);
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
