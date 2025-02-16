import { useMutation, useQueryClient } from "react-query";
import { api } from "../axios";
import { useToast } from "../../components/Toast/Toast";
import { useNavigate } from "react-router-dom";
import { TripBody } from "../../pages/trip/trip.type";

const updateTrip = async ({
  id,
  form,
}: {
  id: string;
  form: TripBody;
}) => {
  const response = await api.put(`/trips/${id}`, form);
  return response.data;
};

export const useUpdateTrip = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();
  return useMutation(updateTrip, {
    onSuccess: () => {
      queryClient.invalidateQueries("trips");
      toast({
        title: "Ponto de ônibus atualizado com sucesso",
        message: "O ponto de ônibus foi atualizado com sucesso",
        type: "success",
      });
      navigate("/admin/trip");
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
