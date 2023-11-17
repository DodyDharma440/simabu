import { GroupPosition } from "@mantine/core";
import {
  ColumnDefTemplate,
  CellContext,
  HeaderContext,
  ColumnMeta,
  AccessorFn,
  RowData,
  VisibilityColumnDef,
  ColumnPinningColumnDef,
  ColumnSizingColumnDef,
  FiltersColumnDef,
  GroupingColumnDef,
  SortingColumnDef,
} from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnDefExtensions<TData extends RowData, TValue = unknown>
    extends VisibilityColumnDef,
      ColumnPinningColumnDef,
      FiltersColumnDef<TData>,
      SortingColumnDef<TData>,
      GroupingColumnDef<TData, TValue>,
      ColumnSizingColumnDef {}

  export interface ColumnDefBase<TData extends RowData, TValue = unknown>
    extends ColumnDefExtensions<TData, TValue> {
    getUniqueValues?: AccessorFn<TData, unknown[]>;
    footer?: ColumnDefTemplate<HeaderContext<TData, TValue>>;
    cell?: ColumnDefTemplate<CellContext<TData, TValue>>;
    meta?: ColumnMeta<TData, TValue>;
    sortKey?: string;
    justifyHeader?: GroupPosition;
    justifyBody?: GroupPosition;
  }
}
