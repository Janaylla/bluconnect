import { useMutation, useQueryClient } from "react-query";
import { BusStopFormTemplate } from "../../pages/busStop/busStop.type";
import { api } from "../axios";
import { useToast } from "../../components/Toast/Toast";
import { useNavigate } from "react-router-dom";

const updateBusStop = async ({
  id,
  form,
}: {
  id: string;
  form: BusStopFormTemplate;
}) => {
  const response = await api.put(`/bus-stops/${id}`, form);
  return response.data;
};

export const useUpdateBusStop = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();
  return useMutation(updateBusStop, {
    onSuccess: () => {
      queryClient.invalidateQueries("busStops");
      toast({
        title: "Ponto de ônibus atualizado com sucesso",
        message: "O ponto de ônibus foi atualizado com sucesso",
        type: "success",
      });
      navigate("/admin/bus-stop");
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
