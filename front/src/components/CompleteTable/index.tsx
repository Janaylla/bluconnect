import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, IconButton, Pagination } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import { useState } from "react";
import DialogDelete, { useDialogDelete } from "../DialogDelete";
import Th from "./Th";
import Filter from "./Filter";
import { CompleteTableProps } from "./completTable.type";


export default function CompleteTable<Type>({
  columns,
  useDelete,
  useGetData,
  path,
  commonUser,
  existeEdit = true,
  showFilter = true,
  existeDelete = true
}: CompleteTableProps<Type>) {
  const [page, setPage] = useState(1);
  const handleChange = (__: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const limit = 10;
  const [order, setOrder] = useState(columns[0]?.key);
  const [asc, setAsc] = useState<'asc' | 'desc'>('asc');
  const [searchs, setSearchs] = useState<Record<string, any>>({});
  const { data } = useGetData({ search: "", limit, page, searchs, order, asc });
  const { handleClose, handleOpen, idDelete } = useDialogDelete();


  const onOrder = (key: string) => {
    if (key === order) {
      setAsc(asc === 'asc' ? 'desc' : 'asc');
    } else {
      setOrder(key);
      setAsc('asc');
    }
  };

  return (
    <Box width={'100%'} position={'relative'}>
      <Box gap={"10px"} display={"flex"} flexDirection={"column"} alignItems={"center"} overflow='auto'>
        {showFilter && <Filter
          handleClose={handleClose}
          columns={columns}
          setSearchs={setSearchs}
          searchs={searchs}
        />}


        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead style={{ backgroundColor: "#c5c5c5" }}>
              <TableRow>
                {columns.map((column) => (
                  <Th asc={asc} column={column} onOrder={onOrder} order={order} key={column.key} />
                ))}
                {!commonUser && <TableCell align="right"></TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.rows?.map((line: any) => (
                <TableRow key={line.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  {columns.map(({ key, transform }) => {
                    let currentValue: Record<string, any> = line;
                    const orders = key.split('.');
                    for (let i = 0; i < orders.length; i++) {
                      const k = orders[i];
                      currentValue = currentValue[k];
                    }

                    return (
                      <TableCell key={key} component="th" scope="row">
                        {transform ? transform(line, data.rows) : String(currentValue)}
                      </TableCell>
                    );
                  })}
                  {!commonUser && (existeEdit || existeDelete) && (
                    <TableCell align="right">
                      {existeEdit && <IconButton aria-label="edit" href={`./${path}/edit/${line.id}`}>
                        <Edit />
                      </IconButton>}
                      {existeDelete && useDelete && <IconButton aria-label="delete" onClick={() => handleOpen(line.id)}>
                        <Delete />
                      </IconButton>}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={Math.ceil((data ? data?.count : 1) / limit)}
          color="primary"
          page={page}
          onChange={handleChange}
        />
        {useDelete && <DialogDelete
          idDelete={idDelete}
          useDelete={useDelete}
          onClose={handleClose}
        />}
      </Box>
    </Box>
  );
}
