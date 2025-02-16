import { UseMutationResult, UseQueryResult } from "react-query";

export interface QuerySearch {
    search: string;
    limit: number;
    page: number;
    order?: string;
    searchs?: Record<string, any>;
    asc?: string;
  }
  
  export interface OutputData<Type> {
    rows: Array<Type>;
    count: number;
  }
  export type CompleteTableColumnTypes = 'quantity' | 'time' | 'text'| 'date' | 'week'
  export interface CompleteTableColumn {
    title: string;
    key: string;
    transform?: (data: any, row: any) => string | number | JSX.Element | undefined;
    type: CompleteTableColumnTypes,
    tranformFilterValue?: (value: any) => string | number;
    notFilter?: boolean;
    notOrder?: boolean
  }
  
  export interface CompleteTableProps<Type> {
    useGetData: (query: QuerySearch) => UseQueryResult<OutputData<Type>, unknown>;
    columns: Array<CompleteTableColumn>;
    useDelete?: () => UseMutationResult<any, unknown, number, unknown>;
    existeEdit?: boolean;
    existeDelete?: boolean;
    path: string;
    commonUser?: boolean;
    showFilter?: boolean;
  }