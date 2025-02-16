import { Box, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { FilterTypesProps } from "./filterTypes.type";
import { daysOfWeek } from "../../../pages/travelSchedule/travelSchedule.type";

const FilterWeek = ({  searchs, setSearchs }: FilterTypesProps) => {
  
  const values = Object.keys(daysOfWeek).filter((key) => {
    return searchs[key] === 'true'
  })
  return (
    <Box>
      <ToggleButtonGroup
        value={values}
        aria-label="Seleção de dias da semana"
        size="small"
      >
        {Object.entries(daysOfWeek).map(([key, dayForWeek]) => (
          <ToggleButton key={key} value={key} onClick={() => setSearchs({
            ...searchs,
            [key]: searchs[key] !== 'true' ? 'true' : 'false'
          })}>
            {dayForWeek.initial}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export const filterWeekConvertLabel = ({ searchs }: FilterTypesProps) => {
  const selectedDays: string[] = [];
  Object.keys(daysOfWeek).forEach((key) => {
    if(searchs[key] === 'true') {
      selectedDays.push(daysOfWeek[key].threeLetters)
    }
  })
  const label = selectedDays.length ? `Dias: ${selectedDays.join(', ')}` : '';
  return label;
};

export const filterWeekRemove = ({ keySearch, searchs }: FilterTypesProps) => {
  const newSearch = { ...searchs };

  Object.keys(daysOfWeek).forEach((key) => {
    delete newSearch[key]
  })
  return newSearch;
};

export default FilterWeek;
