import { UseQueryResult } from "react-query";
import { OutputData, QuerySearch } from "../components/CompleteTable/completTable.type";

export interface InputForm<Value> {
    label: string;
    required: boolean;
    type: "time" | "text" | "number" | "boolean" | 'select';
    select?: {
        getLabelByValue: (v: Value) => string;
        getIdByValue?: (v: Value) => string | number;
        useGetData(p: QuerySearch): UseQueryResult<OutputData<Value>, unknown>
    }
}

export type FormTemplate<InputsTypes> = Record<keyof InputsTypes, InputForm<any>> 