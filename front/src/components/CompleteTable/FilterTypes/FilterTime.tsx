import { Box, TextField } from "@mui/material"
import { FilterTypesProps } from "./filterTypes.type"
import { HHMMToSeconds, secondsToHHMM } from "../../../pages/travelSchedule/travelSchedule.type"

export const FilterTime = ({ setSearchs, searchs, keySearch }: FilterTypesProps) => {
    const keyTo = keySearch + '_to'
    const keyFrom = keySearch + '_from'
    return <Box display={'flex'} gap={1}>
        <TextField
            type="time"
            size="small"
            variant="standard"
            onChange={(e) => setSearchs({
                ...searchs,
                [keyFrom]: HHMMToSeconds(e.target.value),
            })}
            value={secondsToHHMM(searchs[keyFrom])}
        />
        <p>Até</p>
        <TextField
            type="time"
            size="small"
            variant="standard"
            onChange={(e) => setSearchs({
                ...searchs,
                [keyTo]: HHMMToSeconds(e.target.value),
            })}
            value={secondsToHHMM(searchs[keyTo])}
        /></Box>
}
export const filterTimeConvertLabel = ({ keySearch, searchs }: FilterTypesProps) => {
    const keyTo = keySearch + '_to'
    const keyFrom = keySearch + '_from'
    const to =  searchs[keyTo]? secondsToHHMM(searchs[keyTo]) : ''
    const from =  searchs[keyFrom]? secondsToHHMM(searchs[keyFrom]) : ''
    const label = from + ' até ' + to;
    return label
}
export const filterTimeRemove = ({ keySearch, searchs }: FilterTypesProps) => {
    const newSearch = { ...searchs }
    delete newSearch[keySearch + '_from']
    delete newSearch[keySearch + '_to']
    return newSearch;
}