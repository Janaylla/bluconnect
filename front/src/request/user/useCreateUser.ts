import { useMutation, useQueryClient } from "react-query";
import { api } from "../axios";
import { useToast } from "../../components/Toast/Toast";
import { UserForm } from "../../pages/user/user.type"; // Certifique-se de que o UserBody esteja atualizado

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(
    async (data: UserForm) => {
      const response = await api.post("user", data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        toast({
          title: "Usuário criado com sucesso",
          message: "O usuário foi criado com sucesso",
          type: "success",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Erro ao criar usuário",
          message: error.response?.data?.message || "Erro desconhecido ao criar o usuário",
          type: "error",
        });
      },
    }
  );
};
