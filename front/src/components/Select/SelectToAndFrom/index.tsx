import useGetListBusStop, {
  BusStop,
} from "../../../request/busStop/useGetListBusStop";
import SelectWithSearch from "../SelectWithSearch";
const SelectToAndFrom = ({
  label,
  setValue,
  value,
}: {
  label: string;
  setValue: (value: BusStop | undefined) => void;
  value?: BusStop;
}) => {
  return (
    <SelectWithSearch
      getLabelByValue={(v: BusStop) => v.name}
      useGetData={useGetListBusStop}
      limit={20}
      setValue={setValue}
      label={label}
      value={value}
    />
  );
};

export default SelectToAndFrom;
