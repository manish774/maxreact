import { ThemeMode } from "./Default";

export interface HoverActionProp {
  name: string;
  onclick: (item: any) => any;
}
export interface ColumnProps {
  render?: (item: any) => JSX.Element;
  name: string;
  id: string;
  searchable?: boolean;
  sortable?: boolean;
  hoverAction?: HoverActionProp[];
}

export interface TableProps {
  records: any[];
  pageSize: number;
  config: {
    mode?: ThemeMode;
    columns: ColumnProps[];
    title: any;
  };
}
