import { Box, TextField } from "@mui/material";
import { FilterTypesProps } from "./filterTypes.type";


const FilterText = ({ keySearch, searchs, setSearchs }: FilterTypesProps) => {
  return <Box display={'flex'} gap={1}>
    <TextField
      type="text"
      size="small"
      variant="standard"
      onChange={(e) => setSearchs({
        ...searchs,
        [keySearch]: e.target.value,
      })}
      style={{ width: '100px' }}
    />
  </Box>
}
export const filterTextConvertLabel = ({ keySearch, searchs }: FilterTypesProps) => {
  const label = searchs[keySearch] || ''
  return label
}
export const filterTextRemove = ({ keySearch, searchs }: FilterTypesProps) => {
  const newSearch = { ...searchs }
  delete newSearch[keySearch]
  return newSearch;
}
export default FilterText;

