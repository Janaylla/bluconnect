
import CompleteTable from "../../../components/CompleteTable";
import { CompleteTableColumn } from "../../../components/CompleteTable/completTable.type";
import { useDeleteUser } from "../../../request/user/useDeleteUser";
import useGetListUser from "../../../request/user/useGetListUser";
const columns: CompleteTableColumn[] = [
  {
    title: "Nome",
    key: "name",
    type: 'text'
  },
  {
    title: "E-mail",
    key: "email",
    type: 'text'
  },
];
export default function ListUser() {
  return (
    <CompleteTable
      columns={columns}
      useGetData={useGetListUser}
      useDelete={useDeleteUser}
      path="user"
      existeEdit={false}
      existeDelete={true}
      showFilter={false}
    />
  );
}
