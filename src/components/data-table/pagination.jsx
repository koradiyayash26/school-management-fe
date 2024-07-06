import PropTypes from "prop-types";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DataTablePagination({ table }) {
  // Check if row selection is enabled
  const isRowSelectionEnabled = table.options.enableRowSelection;

  return (
    <div className="flex items-center justify-between md:px-2">
      {isRowSelectionEnabled && (
        <div className="md:flex hidden flex-1 text-sm text-muted-foreground">
          {`${table.getFilteredSelectedRowModel().rows.length} of ${
            table.getFilteredRowModel().rows.length
          } row(s) selected.`}
        </div>
      )}
      <div
        className={`flex items-center gap-x-6 gap-y-3 justify-between md:justify-normal md:w-auto w-full ${
          !isRowSelectionEnabled ? "md:ml-auto" : ""
        }`}
      >
        <div className="flex items-center gap-x-2">
          <p className="md:flex hidden text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="md:flex hidden w-[100px] items-center justify-center text-sm font-medium">
          {`Page ${
            table.getState().pagination.pageIndex + 1
          } of ${table.getPageCount()}`}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

DataTablePagination.propTypes = {
  table: PropTypes.shape({
    options: PropTypes.shape({
      enableRowSelection: PropTypes.bool.isRequired,
    }),
    getFilteredSelectedRowModel: PropTypes.func.isRequired,
    getFilteredRowModel: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
    setPageSize: PropTypes.func.isRequired,
    getPageCount: PropTypes.func.isRequired,
    setPageIndex: PropTypes.func.isRequired,
    getCanPreviousPage: PropTypes.func.isRequired,
    previousPage: PropTypes.func.isRequired,
    nextPage: PropTypes.func.isRequired,
    getCanNextPage: PropTypes.func.isRequired,
  }).isRequired,
};
