import { useMutation } from "react-query";
import { api } from "../axios";
import { useToast } from "../../components/Toast/Toast";
import { TravelScheduleForm } from "../../pages/travelSchedule/travelSchedule.type";

export const useCreateTravelSchedule = () => {
  const { toast } = useToast();
  return useMutation(
    async (data: TravelScheduleForm) => {
      const response = await api.post("/travel-schedule", data);
      return response.data;
    },
    {
      onSuccess: () => {
        toast({
          title: "Rota de ônitravel criada com sucesso",
          message: "A rota de ônitravel foi criada com sucesso",
          type: "success",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Erro ao criar rota de ônitravel",
          message: error.response.data.message,
          type: "error",
        });
      },
    }
  );
};
