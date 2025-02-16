import { Box, TableCell } from "@mui/material";
import { CompleteTableColumn } from "./completTable.type";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
interface ThProps {
    column: CompleteTableColumn,
    onOrder: (v: string) => void;
    asc: string;
    order: string;
}

const Th = (props: ThProps) => {
    const { column, order, asc, onOrder } = props
    return (
        <TableCell
            style={{
                cursor: column.notFilter ? 'initial' : 'pointer',
            }}
            key={column.key}
        ><Box
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
            }}
        >
                <Box
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1px'
                    }}
                    onClick={!column.notOrder ? (() => {
                        if (!column.notFilter) onOrder(column.key);
                    }) : undefined}>
                    {column.title}
                    {column.key === order && (asc === 'asc' ? <ArrowDropDown /> : <ArrowDropUp />)}

                </Box>
            </Box>
        </TableCell>
    );
};

export default Th;
