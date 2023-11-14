export interface HoverActionProp {
  name: string;
  oncilck: () => void;
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
    columns: ColumnProps[];
    title: any;
  };
}
