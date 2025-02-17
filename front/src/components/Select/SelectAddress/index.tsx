import useGetListBusStop, { BusStop } from "../../../request/busStop/useGetListBusStop";
import SelectWithSearch, { RenderOption } from "../SelectWithSearch";
import { Box } from "@mui/material";

interface SelectAddressProps {
  setAddress: React.Dispatch<React.SetStateAction<BusStop | undefined>>;
  address: BusStop | undefined
  label: string
}

const SelectAddress = ({ address, setAddress, label }: SelectAddressProps) => {

  const getLabelByValue = (v: BusStop) => {
    return v.name;
  }
  const renderOptions: RenderOption<BusStop> = (props, option) => {
    if (!option?.value) return <></>;
    return (
      <li
        {...props}
        style={{
          listStyle: 'none',
          padding: 0,
        }}
      >
        <Box
          sx={{
            padding: '8px',
            borderRadius: '4px',
            width: '100%',
          }}
        >
          {getLabelByValue(option.value)}
        </Box>
      </li>
    );
  };
  return (
    <SelectWithSearch
      label={label}
      getLabelByValue={getLabelByValue}
      useGetData={useGetListBusStop}
      setValue={(v) => setAddress(v)}
      value={address}
      limit={5}
      renderOptions={renderOptions}
    />
  );
};

export default SelectAddress;
