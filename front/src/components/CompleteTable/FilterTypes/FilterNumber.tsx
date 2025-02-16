import { Box, TextField } from "@mui/material";
import { FilterTypesProps } from "./filterTypes.type";

const FilterNumber = ({ keySearch, searchs, setSearchs }: FilterTypesProps) => {
  return <Box display={'flex'} gap={1}>
    <TextField
      type="number"
      size="small"
      variant="standard"
      onChange={(e) => setSearchs({
        ...searchs,
        [keySearch + '_from']: e.target.value,
      })}
      style={{ width: '70px' }}
    />
    <p>Até</p>
    <TextField
      type="number"
      size="small"
      variant="standard"
      onChange={(e) => setSearchs({
        ...searchs,
        [keySearch + '_to']: e.target.value,
      })}
      style={{ width: '70px' }}
    />
  </Box>
}
export const filterNumberConvertLabel = ({ keySearch, searchs }: FilterTypesProps) => {
  const from = searchs[keySearch + '_from']|| ''
  const to = searchs[keySearch + '_to'] ||''
  const label = from + ' até ' + to;
  return label
}
export default FilterNumber;

export const filterNumberRemove = ({ keySearch, searchs }: FilterTypesProps) => {
  const newSearch = { ...searchs }
  delete newSearch[keySearch + '_from'] 
  delete newSearch[keySearch + '_to']
  return newSearch;
}