import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteOwnerState, AutocompleteRenderOptionState } from "@mui/material/Autocomplete";
import { ReactElement, useEffect, useState } from "react";
import { UseQueryResult } from "react-query";
import { OutputData, QuerySearch } from "../../CompleteTable/completTable.type";

export interface Option<Value> {
  label: string;
  value: Value;
}
export type RenderOption<Value> = (props: React.HTMLAttributes<HTMLLIElement>, option: Option<Value | undefined>, state: AutocompleteRenderOptionState, ownerState: AutocompleteOwnerState<Option<Value | undefined>, false, false, false, "div">) => ReactElement

export interface PropsSelectWithSearch<Value> {
  label?: string;
  getLabelByValue: (v: Value) => string;
  useGetData(p: QuerySearch): UseQueryResult<OutputData<Value>, unknown>
  limit?: number
  setValue: (v: Value | undefined) => void;
  value?: Value;
  renderOptions?: RenderOption<Value>
}

const SelectWithSearch = <Value,>({
  label,
  useGetData,
  getLabelByValue,
  limit = 10,
  setValue,
  value,
  renderOptions
}: PropsSelectWithSearch<Value>) => {
  const [search, setSearch] = useState("");

  const { data } = useGetData({ search, limit, page: 1 });
  const [options, setOption] = useState<Option<Value>[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option<Value | undefined> | undefined>({
    label: value ? getLabelByValue(value) : '',
    value,
  })
  useEffect(() => {
    if (value !== undefined) {
      setSelectedOption({
        label: getLabelByValue(value),
        value,
      });
    } else {
      setSelectedOption(undefined); // Para refletir a mudança para "sem valor"
    }
  }, [value, getLabelByValue]);

  useEffect(() => {
    if (data) {
      setOption(data.rows.map((value) => ({
        label: getLabelByValue(value), value
      }
      )))
    }
  }, [data])
  return (
    <Autocomplete
      value={selectedOption}
      onChange={(event, newValue) => {
        newValue && setSelectedOption(newValue);
        setValue(newValue?.value || undefined)
      }}
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
      renderOption={renderOptions}
      onInputChange={(__: any, newInputValue: string) => {
        setSearch(newInputValue);
      }}
    />
  );
};

export default SelectWithSearch;
