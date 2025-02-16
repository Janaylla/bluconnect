import { Box, TextField } from "@mui/material"
import { FilterTypesProps } from "./filterTypes.type"
import { secondsToHHMM } from "../../../pages/travelSchedule/travelSchedule.type"

export const FilterDate = ({ setSearchs, searchs, keySearch }: FilterTypesProps) => {
    const keyTo = keySearch + '_to'
    const keyFrom = keySearch + '_from'
    return <Box display={'flex'} gap={1}>
        <TextField
            type="datetime-local"
            size="small"
            variant="standard"
            onChange={(e) => setSearchs({
                ...searchs,
                [keyTo]: e.target.value,
            })}
            value={secondsToHHMM(searchs[keyFrom])}
        />
        <p>Até</p>
        <TextField
            type="datetime-local"
            size="small"
            variant="standard"
            onChange={(e) => setSearchs({
                ...searchs,
                [keyTo]: e.target.value,
            })}
            value={secondsToHHMM(searchs[keyTo])}
        /></Box>
}
export const filterDateConvertLabel = ({ keySearch, searchs }: FilterTypesProps) => {
    const keyTo = keySearch + '_to'
    const keyFrom = keySearch + '_from'
    const to =  searchs[keyTo]? secondsToHHMM(searchs[keyTo]) : ''
    const from =  searchs[keyFrom]? secondsToHHMM(searchs[keyFrom]) : ''
    const label = from + ' até ' + to;
    return label
}
export const filterDateRemove = ({ keySearch, searchs }: FilterTypesProps) => {
    const newSearch = { ...searchs }
    delete newSearch[keySearch + '_from']
    delete newSearch[keySearch + '_to']
    return newSearch;
}