import { useMutation, useQueryClient } from "react-query";
import { api } from "../axios";
import { useToast } from "../../components/Toast/Toast";

export const useDeleteUser = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    async (id: number) => {
      await api.delete(`/user/${id}`);
    },
    {
        onError: (error: any) => {
            toast({
                title: "Erro ao deletar usuário",
                message: error.response.data.message,
                type: "error",
            });
            },
        onSuccess: () => {
            queryClient.invalidateQueries("user");
            toast({
                title: "Usuário deletado com sucesso",
                message: "O ponto de ônibus foi deletado com sucesso",
                type: "success",
            });
        }
    }
  );
};
