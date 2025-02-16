import useGetListTrip from "../../../request/trip/useGetListTrip";
import CompleteTable from "../../../components/CompleteTable";
import { useDeleteTrip } from "../../../request/trip/useDeleteTrip";
import { CompleteTableColumn } from "../../../components/CompleteTable/completTable.type";
const columns: CompleteTableColumn[] = [
  {
    title: "Code",
    key: "code",
    type: 'text'
  },
  {
    title: "Ponto inicial",
    key: "startBusStop.name",
    type: 'text'
  },
  {
    title: "Ponto final",
    key: "endBusStop.name",
    type: 'text'
  },
  {
    title: "Quantidade de paradas",
    key: "numberStops",
    type: 'quantity'
  },
];
export default function ListTrip() {
  return (
    <CompleteTable
      columns={columns}
      useGetData={useGetListTrip}
      useDelete={useDeleteTrip}
      path="trip"
      existeEdit={true}
    />
  );
}
