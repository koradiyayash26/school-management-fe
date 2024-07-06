import PropTypes from "prop-types";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "./faceted-filter";
import { DataTableViewOptions } from "./view-options";
import DebouncedInput from "./debounced-input";

export function DataTableToolbar({ table, settings }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-x-2 gap-y-3 flex-wrap">
        {settings.enableGlobalFilter && (
          // <Input
          //   placeholder="Filter tasks..."
          //   value={table.getState().globalFilter ?? ""}
          //   onChange={(e) => table.setGlobalFilter(e.target.value)}
          //   className="h-8 w-full md:w-[250px]"
          // />
          <DebouncedInput
            value={table.getState().globalFilter ?? ""}
            onChange={(value) => table.setGlobalFilter(value)}
          />
        )}
        {settings.facetedFilters.map((filter) => (
          <DataTableFacetedFilter
            key={filter.column}
            column={table.getColumn(filter.column)}
            title={filter.title}
            options={filter.options}
          />
        ))}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <DataTableViewOptions table={table} />
    </div>
  );
}

DataTableToolbar.propTypes = {
  table: PropTypes.object.isRequired,
  settings: PropTypes.shape({
    enableGlobalFilter: PropTypes.bool,
    facetedFilters: PropTypes.arrayOf(
      PropTypes.shape({
        column: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        options: PropTypes.array.isRequired,
      })
    ),
  }),
  loading: PropTypes.bool,
};
