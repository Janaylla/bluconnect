import useGetListTravelSchedule, { TravelSchedule } from "../../../request/travelSchedule/useGetListTravelSchedule";
import CompleteTable from "../../../components/CompleteTable";
import { useDeleteTravelSchedule } from "../../../request/travelSchedule/useDeleteTravelSchedule";
import { secondsToHHMM, daysOfWeek } from "../travelSchedule.type";
import { Box } from "@mui/material";
import { CompleteTableColumn } from "../../../components/CompleteTable/completTable.type";
const transformDays = (value: TravelSchedule | any) => {

  const date =  new Date();
  const day = date.getDay()
  return <Box display={'flex'} gap={'10px'}>
    {
      Object.entries(daysOfWeek).map(([key, daysOfWeek]) => {
        const isChecked = value[key as any];
        const initial = daysOfWeek.initial;
        const isCurrentDay = day === daysOfWeek.index
        return <Box
      
          sx={{
            border: '1px solid',
            borderColor: isChecked ? '#4caf50' : '#f44336', // Verde se check, vermelho se não
            borderRadius: '8px', // Borda arredondada
            padding: '4px 8px', // Espaçamento interno
            display: 'inline-block', // Para o Box se comportar como um botão
            backgroundColor: isChecked ? '#e8f5e9' : '#ffebee', // Cores diferentes de fundo
            minWidth: '40px', // Tamanho mínimo
            textAlign: 'center', // Alinhar o texto no centro
            fontWeight: 'bold' , // Destaca o dia atual
            color: '#000', // Muda a cor para um tom mais apagado
            opacity: isCurrentDay ? 1 : 0.6 // Opacidade reduzida para os outros dias
          }}
        >
          {initial}
        </Box>
      })
  }
  </Box>

}
const columns: CompleteTableColumn[] = [
  {
    title: "Horário",
    key: "time",
    transform: (value: TravelSchedule) => secondsToHHMM(value.time),
    type: 'time'
  },
  {
    title: "Viagem",
    key: 'trip.code',
    type: 'text'
  },
  {
    title: 'Dias da Semana',
    key: 'week',
    transform: transformDays,
    type: 'week',
    notOrder: true,
  }

];
interface ListTravelScheduleProps {
  commonUser: boolean;
}
export default function ListTravelSchedule({
  commonUser
}: ListTravelScheduleProps) {
  return (
    <CompleteTable
      columns={columns}
      useGetData={useGetListTravelSchedule}
      useDelete={useDeleteTravelSchedule}
      path="travel-schedule"
      commonUser={commonUser}
      existeEdit={true}
    />
  );
}
