import React, { useEffect, useState } from 'react';
import { Box, Button, Menu, MenuItem, Chip, IconButton } from '@mui/material';
import { FilterList, ArrowDropDown, Close, Check } from '@mui/icons-material';
import FilterNumber, { filterNumberConvertLabel, filterNumberRemove } from './FilterTypes/FilterNumber';
import FilterText, { filterTextConvertLabel, filterTextRemove } from './FilterTypes/FilterText';
import { FilterTime, filterTimeConvertLabel, filterTimeRemove } from './FilterTypes/FilterTime';
import FilterWeek, { filterWeekConvertLabel, filterWeekRemove } from './FilterTypes/FilterWeek';
import { CompleteTableColumn, CompleteTableColumnTypes } from './completTable.type';
import { FilterTypesProps } from './FilterTypes/filterTypes.type';
import { FilterDate, filterDateConvertLabel, filterDateRemove } from './FilterTypes/FilterDate';


interface FilterButtonProps {
    handleClose: () => void;
    columns: CompleteTableColumn[];
    setSearchs: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    searchs: Record<string, any>;
}

const componentes: Record<CompleteTableColumnTypes, {
    Component: (p: FilterTypesProps) => JSX.Element,
    tranformLabel: (p: FilterTypesProps) => string
    removeFilter: (p: FilterTypesProps) => Record<string, any>
}> = {
    quantity: {
        Component: FilterNumber,
        tranformLabel: filterNumberConvertLabel,
        removeFilter: filterNumberRemove,
    },
    text: {
        Component: FilterText,
        tranformLabel: filterTextConvertLabel,
        removeFilter: filterTextRemove,
    },
    time: {
        Component: FilterTime,
        tranformLabel: filterTimeConvertLabel,
        removeFilter: filterTimeRemove,
    },
    week: {
        Component: FilterWeek,
        tranformLabel: filterWeekConvertLabel,
        removeFilter: filterWeekRemove,
    },
    date: {
        Component: FilterDate,
        tranformLabel: filterDateConvertLabel,
        removeFilter: filterDateRemove,
    }
}

const Filter = ({ searchs, columns, setSearchs }: FilterButtonProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedColumn, setSelectedColumn] = useState<CompleteTableColumn | null>(null);

    const [selectedColumnSearchs, setSelectedColumnSearchs] = useState<Record<string, any>>(searchs);

    useEffect(() => {
        setSelectedColumnSearchs({ ...searchs })
    }, [searchs])

    const [appliedFilters, setAppliedFilters] = useState<Record<string, CompleteTableColumn>>({});

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleColumnSelect = (column: CompleteTableColumn) => {
        setSelectedColumn(column);
        handleCloseMenu();
    };


    const handleRemoveFilter = (column: CompleteTableColumn) => {
        const removeFilter = componentes[column.type].removeFilter;
        const newFilters = { ...appliedFilters };
        delete newFilters[column.key];
        setAppliedFilters(newFilters);
        setSearchs(removeFilter({
            keySearch: column.key,
            searchs,
            setSearchs,
        }))
    };

    const handleConfirmFilter = () => {
        if (selectedColumn) {
            setAppliedFilters({
                [selectedColumn.key]: selectedColumn,
                ...appliedFilters
            });
            setSelectedColumn(null)
            setSearchs({ ...selectedColumnSearchs })
            handleCloseMenu();
        }
    };

    const getSelectedColumn = (selectedColumn: CompleteTableColumn) => {
        const {Component, tranformLabel} = componentes[selectedColumn.type];
        return <Box
            position={'relative'}
            width={'auto'}
        >
            <Chip
                label={selectedColumn.title + ':' + tranformLabel({
                    searchs: selectedColumnSearchs,
                    keySearch: selectedColumn.key,
                    setSearchs: setSelectedColumnSearchs
                })}
                deleteIcon={<Close />}
                sx={{ marginRight: 1 }} // Margem entre os chips
                onDelete={() => setSelectedColumn(null)}
            />
            <Box
                sx={{
                    backgroundColor: '#f5f5f5', // Fundo cinza claro
                    borderRadius: '8px', // Bordas arredondadas
                    padding: '8px', // Espaçamento interno
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Sombra leve
                    position: 'absolute',
                    marginTop: '10px',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                <Component keySearch={selectedColumn.key} searchs={selectedColumnSearchs} setSearchs={setSelectedColumnSearchs} />
                <IconButton
                    onClick={handleConfirmFilter}
                >
                    <Check /> {/* Ícone de confirmação */}
                </IconButton>
            </Box>
        </Box>
    }

    return (
        <Box position={'relative'} sx={{ alignSelf: 'start' }}>
            <Button
                onClick={handleMenuClick}
                endIcon={<ArrowDropDown />}
                startIcon={<FilterList />}
                sx={{
                    backgroundColor: '#1976d2', // Cor de fundo
                    color: '#ffffff', // Cor do texto
                    borderRadius: '5px', // Borda arredondada
                    padding: '8px 16px', // Espaçamento interno
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Sombra suave
                    '&:hover': {
                        backgroundColor: '#155a8a', // Cor ao passar o mouse
                    },
                }}
            >
                Filtrar por
            </Button>
            <Box position={'absolute'}>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                    {columns.map((column) => (
                        <MenuItem key={column.key} onClick={() => handleColumnSelect(column)}>
                            {column.title}
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
            <Box sx={{ mt: 2, mb: 1, display: 'flex' }} >
                {selectedColumn && (
                    getSelectedColumn(selectedColumn)
                )}
                {/* Exibe os filtros aplicados */}
                {Object.entries(appliedFilters).map(([key, column]) => {
                    const tranformLabel = componentes[column.type].tranformLabel
                    const label = tranformLabel({
                        keySearch: key,
                        searchs, setSearchs
                    })
                    return (
                        <Chip
                            key={key}
                            label={column.title + ': ' + label}
                            onDelete={() => handleRemoveFilter(column)}
                            deleteIcon={<Close />}
                            sx={{ marginRight: 1 }} // Margem entre os chips
                        />
                    )
                })}
            </Box>
        </Box>
    );
};

export default Filter;
