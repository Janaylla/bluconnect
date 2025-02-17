import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box, DialogContent, SvgIconTypeMap } from "@mui/material";
import { CompleteTableColumn } from "../CompleteTable/completTable.type";
import useGetListLog from "../../request/log/useGetListLog";
import CompleteTable from "../CompleteTable";
import { Add, Delete, Edit } from "@mui/icons-material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Log, LogMethod, LogMethods, LogModels } from "./Log.types";

function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);

  // Obter a data atual
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();

  // Formatação para dd/MM/yyyy
  const optionsDate: any = {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    year: 'numeric',
  };
  const optionsTime: any = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Para formato 24 horas
  };

  // Se for hoje, retorna 'Hoje', senão retorna a data formatada
  return isToday
    ? `Hoje, ${date.toLocaleTimeString('pt-BR', optionsTime)}`
    : date.toLocaleDateString('pt-BR', optionsDate);
}

const actionToIcon: Record<LogMethod, OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
}> = {
  POST: Add,
  PUT: Edit,
  DELETE: Delete,
}

const getIconAction = (value: Log) => {
  const Icon = actionToIcon[value.method];
  return Icon
}

const transmDesc = (value: Log) => {
  const methodDes = LogMethods[value.method];
  const modelDes = LogModels[value.model];
  let description = `${methodDes} ${modelDes}`;
  if(value.model === 'Login'){
    description = `Entrou no sistema`
  }
  const Icon = getIconAction(value);
  return <Box display="flex" alignItems="center">
    <Icon />
    {description}
  </Box>
}
const columns: CompleteTableColumn[] = [
  {
    title: "Data",
    key: "timestamp",
    type: 'date',
    transform: (value: Log) => {
      return formatTimestamp(value.timestamp)
    }
  },
  {
    title: "Usuário",
    key: "user.name",
    type: 'text',
  },
  {
    title: "Descrição",
    key: "description",
    type: 'text',
    transform:transmDesc,
    notOrder: true,
  },
];

function ListLogs() {
  return (
    <CompleteTable
      columns={columns}
      useGetData={useGetListLog}
      path="log"
      commonUser={false}
      showFilter={false}
      existeEdit={false}
    />
  );
}


export interface SimpleDialogProps {
  onClose: () => void;
  open: boolean;
}

export default function DialogLog({
  onClose,
  open
}: SimpleDialogProps) {

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Logs</DialogTitle>
      <DialogContent sx={
        {
          maxWidth: '100%',
          width: '900px',
          height: '500px',
          maxHeight: '100%',
          overflowY: 'auto'
        }
      }>
        <ListLogs />
      </DialogContent>
    </Dialog>
  );
}