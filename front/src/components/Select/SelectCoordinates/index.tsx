import { TextField, Box } from "@mui/material";
import { useState } from "react";

interface SelectCoordinatesProps {
  setValue: (value: { latitude: number; longitude: number }) => void;
  label: string;
}

const SelectCoordinates: React.FC<SelectCoordinatesProps> = ({ setValue, label }) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleChange = () => {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (!isNaN(lat) && !isNaN(lon)) {
      setValue({ latitude: lat, longitude: lon });
    }
  };

  return (
    <Box display="flex" gap="10px">
      <TextField
        label={`${label} - Latitude`}
        value={latitude}
        onChange={(e) => {
          setLatitude(e.target.value);
          handleChange();
        }}
        type="number"
      />
      <TextField
        label={`${label} - Longitude`}
        value={longitude}
        onChange={(e) => {
          setLongitude(e.target.value);
          handleChange();
        }}
        type="number"
      />
    </Box>
  );
};

export default SelectCoordinates;
