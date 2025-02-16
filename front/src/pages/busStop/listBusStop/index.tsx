import useGetListBusStop from "../../../request/busStop/useGetListBusStop";
import CompleteTable from "../../../components/CompleteTable";
import { CompleteTableColumn } from "../../../components/CompleteTable/completTable.type";
import { useDeleteBusStop } from "../../../request/busStop/useDeleteBusStop";
const columns: CompleteTableColumn[] = [
  {
    title: "Nome",
    key: "name",
    type: 'text'
  },
  {
    title: "Latitude",
    key: "latitude",
    type: 'quantity'

  },
  {
    title: "Longitude",
    key: "longitude",
    type: 'quantity'
  },
];
export default function ListBusStop() {
  return (
    <CompleteTable
      columns={columns}
      useGetData={useGetListBusStop}
      useDelete={useDeleteBusStop}
      path="bus-stop"
      existeEdit={true}
    />
  );
}
