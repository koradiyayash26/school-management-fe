import * as React from "react";
import PropTypes from "prop-types";
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender, // Added this line
} from "@tanstack/react-table";

import { DataTablePagination } from "./pagination";
import { DataTableToolbar } from "./toolbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  DataTableBodySkeleton,
  DataTablePaginationSkeleton,
  DataTableToolbarSkeleton,
} from "./skeletons";

const defaultSettings = {
  enableGlobalFilter: false,
  enableRowSelection: false,
  hiddenColumns: {},
  globalFilterColumns: [],
  facetedFilters: [],
};

export function DataTable({ data, columns, loading = false, settings = {} }) {
  settings = { ...defaultSettings, ...settings };

  const [globalFilter, setGlobalFilter] = React.useState("");
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState({
    ...settings.hiddenColumns,
  });
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },
    enableRowSelection: settings.enableRowSelection,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      {loading ? (
        <DataTableToolbarSkeleton />
      ) : (
        <DataTableToolbar table={table} settings={settings} />
      )}

      <ScrollArea
        className="rounded-md border h-[50vh]"
        scrollClassName="z-[2]"
      >
        {loading ? (
          <DataTableBodySkeleton />
        ) : (
          <Table>
            <TableHeader className="sticky top-0 bg-white dark:bg-zinc-950 z-[1] [&_tr]:border-0 [&_tr]:shadow-[inset_0_-1px_0] [&_tr]:shadow-border">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {loading ? (
        <DataTablePaginationSkeleton />
      ) : (
        <DataTablePagination table={table} />
      )}
    </div>
  );
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  tools: PropTypes.any,
  settings: PropTypes.shape({
    hiddenColumns: PropTypes.object,
    globalFilterColumns: PropTypes.arrayOf(PropTypes.string),
    enableGlobalFilter: PropTypes.bool,
  }),
  loading: PropTypes.bool,
  error: PropTypes.any,
};
