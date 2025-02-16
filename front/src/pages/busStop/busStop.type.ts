import { FormTemplate } from "../../types/Form";

export interface BusStopFormTemplate {
  name: string;
  latitude: number;
  longitude: number;
}

export const busFormTemplate: FormTemplate<BusStopFormTemplate> = {
  name: {
    label: "Nome",
    required: true,
    type: "text",
  },
  latitude: {
    label: "Latitude",
    required: true,
    type: "number",
  },
  longitude: {
    label: "Longitude",
    required: true,
    type: "number",
  },
};
