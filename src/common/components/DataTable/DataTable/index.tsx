import React, { useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  Header,
  HeaderGroup,
  Cell,
  Row,
  RowSelectionState,
  OnChangeFn,
  getExpandedRowModel,
  FilterFn,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import {
  Box,
  BoxProps,
  Center,
  Group,
  Loader,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { PolymorphicComponentProps } from "@mantine/utils";
import { AxiosError } from "axios";
import {
  IoWarningOutline,
  IoFileTrayOutline,
  IoArrowUpOutline,
} from "react-icons/io5";
import { TbArrowsSort } from "react-icons/tb";
import { getErrorMessage } from "@/common/utils/react-query";
import { isDark, opacityColor } from "@/common/utils/theme";
import { SortType } from "@/common/interfaces/ui";
import DataTableContainer from "../Container";
import DataTableSearch from "../Search";
import DataTablePerPage from "../PerPage";
import DataTableWrapper from "../Wrapper";
import DataTableLoader from "../Loader";

type ElProps<C extends keyof JSX.IntrinsicElements> = PolymorphicComponentProps<
  C,
  BoxProps
>;

export type TableElementProps<D> = Partial<{
  th: ElProps<"th"> | ((header?: Header<D, any>) => ElProps<"th">);
  trHead: ElProps<"tr"> | ((headerGroup?: HeaderGroup<D>) => ElProps<"tr">);
  td: ElProps<"td"> | ((cell?: Cell<D, any>) => ElProps<"td">);
  trBody: ElProps<"tr"> | ((row?: Row<D>) => ElProps<"tr">);
}>;

type DataTableProps<D extends Object = {}, V = any> = {
  data: D[];
  columns: ColumnDef<D, V>[];
  withFooter?: boolean;
  rowSelection?: RowSelectionState;
  isLoading?: boolean;
  isRefetching?: boolean;
  error?: AxiosError<any, any> | null;
  clientSearch?: string;
  onChangeClientSearch?: (val: string) => void;
  onChangeSelection?: OnChangeFn<RowSelectionState>;
  elementProps?: TableElementProps<D>;
  getRowCanExpand?: (row: Row<D>) => boolean;
  renderSubComponent?: (row: Row<D>) => React.ReactNode;
  expandContentOffset?: number;
  sortBy?: { field: string; type: SortType };
  onSort?: (args: { field: string; type: SortType }) => void;
};

const getElementProps = <T, P>(elProps: T | ((data?: P) => T), data?: P) => {
  if (elProps instanceof Function) {
    return elProps(data);
  }
  return elProps;
};

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({
    itemRank,
  });
  return itemRank.passed;
};

const DataTable = <D extends Object, V = any>({
  data,
  columns,
  withFooter,
  rowSelection,
  onChangeSelection,
  elementProps,
  isLoading,
  isRefetching,
  error,
  clientSearch,
  getRowCanExpand,
  renderSubComponent,
  expandContentOffset = 2,
  sortBy,
  onSort,
}: DataTableProps<D, V>) => {
  const theme = useMantineTheme();

  const table = useReactTable<D>({
    data,
    columns,
    getRowCanExpand: renderSubComponent ? () => true : getRowCanExpand,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      rowSelection,
      globalFilter: clientSearch,
    },
    onRowSelectionChange: onChangeSelection,
    globalFilterFn: fuzzyFilter,
  });

  const headerGroups = table.getHeaderGroups();
  const rowModels = table.getRowModel();
  const footerGroups = table.getFooterGroups();

  const handleSort = useCallback(
    (key?: string) => {
      if (key) {
        const typesData: Record<SortType, SortType> = {
          asc: "desc",
          desc: "default",
          default: "asc",
        };
        onSort?.({ field: key, type: typesData[sortBy?.type || "default"] });
      }
    },
    [onSort, sortBy?.type]
  );

  return (
    <Box sx={{ overflow: "auto", position: "relative" }}>
      <Table>
        <Box
          component="thead"
          sx={(theme) => ({
            background: theme.fn.gradient(),
            backgroundAttachment: "fixed",
            ["& th"]: {
              whiteSpace: "nowrap",
              color: `${theme.white}!important`,
            },
          })}
        >
          {headerGroups.map((headerGroup) => (
            <Box
              component="tr"
              key={headerGroup.id}
              {...getElementProps(elementProps?.trHead, headerGroup)}
            >
              {headerGroup.headers.map((header, index) => {
                const isFirst = index === 0;
                const isLast = index === headerGroup.headers.length - 1;
                const { sortKey, justifyHeader } = header.column.columnDef;

                return (
                  <Box
                    component="th"
                    key={header.id}
                    title={sortKey ? `Sort by ${sortKey}` : undefined}
                    style={{
                      width: ["selection", "row-expand", "row-number"].includes(
                        header.id
                      )
                        ? "10px"
                        : undefined,
                      paddingLeft: isFirst ? theme.spacing.md : undefined,
                      paddingRight: isLast ? theme.spacing.md : undefined,
                      paddingTop: theme.spacing.xs,
                      paddingBottom: theme.spacing.xs,
                      cursor: sortKey ? "pointer" : "default",
                    }}
                    {...getElementProps(elementProps?.th, header)}
                    onClick={() => handleSort(sortKey)}
                  >
                    {header.isPlaceholder ? null : (
                      <Group spacing={4} noWrap position={justifyHeader}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <Text
                          sx={(theme) => ({
                            display: "flex",
                            color: opacityColor(theme.white, 80),
                          })}
                          component="span"
                        >
                          {sortBy && sortBy?.field === sortKey ? (
                            <>
                              {sortBy?.type === "default" ? (
                                <TbArrowsSort />
                              ) : (
                                <Text
                                  component="span"
                                  sx={{
                                    display: "flex",
                                    transition: ".2s",
                                    transform: `rotate(${
                                      sortBy?.type === "desc" ? "180deg" : "0"
                                    })`,
                                  }}
                                >
                                  <IoArrowUpOutline />
                                </Text>
                              )}
                            </>
                          ) : sortKey ? (
                            <TbArrowsSort />
                          ) : null}
                        </Text>
                      </Group>
                    )}
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>

        <Box
          component="tbody"
          sx={(theme) => ({
            position: "relative",
            backgroundColor: isDark(theme) ? theme.colors.dark[8] : theme.white,
          })}
        >
          {isRefetching && !isLoading ? (
            <>
              <Box
                component="tr"
                sx={(theme) => ({
                  position: "absolute",
                  backgroundColor: opacityColor(theme.colors.gray[5], 50),
                  inset: 0,
                  zIndex: 2,
                })}
              />
              <Box
                component="tr"
                sx={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 3,
                }}
              >
                <Center component="td" colSpan={columns.length} height="100%">
                  <Loader />
                </Center>
              </Box>
            </>
          ) : null}
          {isLoading ? (
            <Box component="tr" h="300px">
              <Box component="td" colSpan={columns.length}>
                <Center>
                  <Loader />
                </Center>
              </Box>
            </Box>
          ) : error ? (
            <Box component="tr" h="300px">
              <Box component="td" colSpan={columns.length}>
                <Center sx={{ flexDirection: "column" }}>
                  <IoWarningOutline size={36} />
                  <Text mt="xs">{getErrorMessage(error)}</Text>
                </Center>
              </Box>
            </Box>
          ) : [data.length, rowModels.rows.length].includes(0) ? (
            <Box component="tr" h="300px">
              <Box component="td" colSpan={columns.length}>
                <Center sx={{ flexDirection: "column" }}>
                  <IoFileTrayOutline size={36} />
                  <Text mt="sm">No Data</Text>
                </Center>
              </Box>
            </Box>
          ) : (
            <>
              {rowModels.rows.map((row) => {
                return (
                  <React.Fragment key={row.id}>
                    <Box
                      component="tr"
                      {...getElementProps(elementProps?.trBody, row)}
                    >
                      {row.getVisibleCells().map((cell, cellIndex) => {
                        const isFirst = cellIndex === 0;
                        const isLast =
                          cellIndex === row.getVisibleCells().length - 1;
                        const { justifyBody } = cell.column.columnDef;

                        return (
                          <Box
                            component="td"
                            style={{
                              paddingLeft: isFirst
                                ? theme.spacing.md
                                : undefined,
                              paddingRight: isLast
                                ? theme.spacing.md
                                : undefined,
                            }}
                            key={cell.id}
                            {...getElementProps(elementProps?.td, cell)}
                          >
                            <Group position={justifyBody} noWrap>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </Group>
                          </Box>
                        );
                      })}
                    </Box>
                    {row.getIsExpanded() && renderSubComponent ? (
                      <Box component="tr">
                        {[...Array(expandContentOffset)].map((_, i) => {
                          return <Box component="td" key={i} />;
                        })}
                        <Box
                          component="td"
                          colSpan={
                            row.getVisibleCells().length - expandContentOffset
                          }
                        >
                          {renderSubComponent(row)}
                        </Box>
                      </Box>
                    ) : null}
                  </React.Fragment>
                );
              })}
            </>
          )}
        </Box>

        {withFooter ? (
          <Box component="tfoot">
            {footerGroups.map((footerGroup) => (
              <Box component="tr" key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <Box component="th" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        ) : null}
      </Table>
    </Box>
  );
};

const _DataTable: typeof DataTable & {
  Container: typeof DataTableContainer;
  Search: typeof DataTableSearch;
  PerPage: typeof DataTablePerPage;
  Wrapper: typeof DataTableWrapper;
  Loader: typeof DataTableLoader;
} = DataTable as any;

_DataTable.Container = DataTableContainer;
_DataTable.Search = DataTableSearch;
_DataTable.PerPage = DataTablePerPage;
_DataTable.Wrapper = DataTableWrapper;
_DataTable.Loader = DataTableLoader;

export default _DataTable;
