import { ColumnProps } from "./TableModel";

export type ThemeMode = "dark" | "light";

export interface tableConfig {
  mode?: ThemeMode;
  title: JSX.Element;
  columns: ColumnProps[];
}
