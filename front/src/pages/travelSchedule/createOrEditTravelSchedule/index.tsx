import { Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HHMMToSeconds, secondsToHHMM, TravelScheduleForm, daysOfWeek, DayForWeek } from "../travelSchedule.type";
import { useGetTravelSchedule } from "../../../request/travelSchedule/useGetTravelSchedule";
import { useUpdateTravelSchedule } from "../../../request/travelSchedule/useUpdateTravelSchedule";
import { useCreateTravelSchedule } from "../../../request/travelSchedule/useCreateTravelSchedule";
import SelectWithSearch from "../../../components/Select/SelectWithSearch";
import useGetListTrip, { Trip } from "../../../request/trip/useGetListTrip";

const CreateOrEditTravelSchedule = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o ID da URL
  const [form, setForm] = useState<TravelScheduleForm>({
    friday: false,
    monday: false,
    saturday: false,
    sunday: false,
    thursday: false,
    time: '',
    tripId: 0,
    tuesday: false,
    wednesday: false
  })
  const { data: travelSchedule, isLoading } = useGetTravelSchedule(id as string);
  const { mutate: updateTravelSchedule } = useUpdateTravelSchedule();
  const { mutate: creteTravelShedule } = useCreateTravelSchedule()
  useEffect(() => {
    if (travelSchedule) {
      setForm({
        ...travelSchedule,
        time: secondsToHHMM(travelSchedule.time)
      })
    }
  }, [travelSchedule])
  const handleSubmit = async () => {
    const body = {
      ...form,
      time: HHMMToSeconds(String(form.time))
    }
    if (id) {
      updateTravelSchedule({ id, form: body });
    } else {
      creteTravelShedule(body)
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  if (isLoading && id) return <div>Carregando...</div>;

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          rowGap={'20px'}
        >
          <TextField
            size="medium"
            key={'time'}
            id="outlined-basic"
            label={'Horário'}
            required={true}
            type={'time'}
            name={'time'}
            value={form.time}
            onChange={handleChange}
          />
          <SelectWithSearch
            getLabelByValue={(t: Trip) => t.code}
            setValue={(v) => {
              setForm({ ...form, 'tripId': v?.id || 0 });
            }}
            useGetData={useGetListTrip}
            label="Viagem"
          />
          <Box>
            <p>
              Semanas:
            </p>
            {
              Object.entries(daysOfWeek).map(([key, label]: [any, DayForWeek]) => {
                const value = form as any
                return <FormControlLabel control={
                  <Checkbox
                    checked={!!value[key]}
                    onChange={
                      (e) => setForm({
                        ...form,
                        [key]: !value[key]
                      })
                    }
                  />} label={label.threeLetters} />
              })
            }
          </Box>
          <Box
            alignSelf={'center'}
          >
            <Button
              size="large" type="submit" variant="contained">
              Salvar
            </Button>

          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default CreateOrEditTravelSchedule;
