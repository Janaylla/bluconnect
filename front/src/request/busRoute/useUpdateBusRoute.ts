import { useMutation, useQueryClient } from "react-query";
import { BusRouteForm } from "../../pages/busRoute/busRoute.type";
import { api } from "../axios";
import { useToast } from "../../components/Toast/Toast";
import { useNavigate } from "react-router-dom";

const updateBusRoute = async ({
  id,
  form,
}: {
  id: string;
  form: BusRouteForm;
}) => {
  const response = await api.put(`/bus-routes/${id}`, form);
  return response.data;
};

export const useUpdateBusRoute = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();
  return useMutation(updateBusRoute, {
    onSuccess: () => {
      queryClient.invalidateQueries("busRoutes");
      toast({
        title: "Ponto de ônibus atualizado com sucesso",
        message: "O ponto de ônibus foi atualizado com sucesso",
        type: "success",
      });
      navigate("/admin/bus-route");
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao atualizar ponto de ônibus",
        message: error.response.data.message,
        type: "error",
      });
    },
  });
};
