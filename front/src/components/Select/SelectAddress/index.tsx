import SelectWithSearch, { RenderOption } from "../SelectWithSearch";
import useGetListAdress, { Address } from "../../../request/test";
import { Box } from "@mui/material";

interface SelectAddressProps {
  setAddress: React.Dispatch<React.SetStateAction<Address | undefined>>;
  address: Address | undefined
  label: string
}

const SelectAddress = ({ address, setAddress, label }: SelectAddressProps) => {

  const getLabelByValue = (v: Address) => {
    if (v.type === 'choice-in-map') {
      return 'Selecione um ponto no mapa'
    }
    return v.value.name;
  }
  const renderOptions: RenderOption<Address> = (props, option) => {
    const isChoiceImMap = option.value?.type === 'choice-in-map';
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
            backgroundColor: isChoiceImMap ? '#87cfeb32' : 'inherit',
            padding: '8px',
            borderRadius: '4px',
            width: '100%',
            ":hover": {
              backgroundColor: isChoiceImMap ? '#87cfeb63' : 'inherit',
            },
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
      useGetData={useGetListAdress}
      setValue={(v) => setAddress(v)}
      value={address}
      limit={5}
      renderOptions={renderOptions}
    />
  );
};

export default SelectAddress;
