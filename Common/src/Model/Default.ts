export type ThemeMode = "dark" | "light";

export interface tableConfig {
  paginationRequired?: boolean;
  mode?: ThemeMode;
  title: JSX.Element;
  columns: ColumnProps[];
  showHeaderCount?: boolean;
}

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
  config: tableConfig;
}
