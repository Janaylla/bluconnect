import { useMutation, useQueryClient } from "react-query";
import { api } from "../axios";
import { useToast } from "../../components/Toast/Toast";

export const useDeleteTravelSchedule = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    async (id: number) => {
      await api.delete(`/travel-schedule/${id}`);
    },
    {
        onError: (error: any) => {
            toast({
                title: "Erro ao deletar ponto de ônitravel",
                message: error.response.data.message,
                type: "error",
            });
            },
        onSuccess: () => {
            queryClient.invalidateQueries("travelSchedule");
            toast({
                title: "Ponto de ônitravel deletado com sucesso",
                message: "O ponto de ônitravel foi deletado com sucesso",
                type: "success",
            });
        }
    }
  );
};
