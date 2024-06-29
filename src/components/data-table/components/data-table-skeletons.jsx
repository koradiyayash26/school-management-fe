import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DataTableBodySkeleton() {
  return (
    <Table>
      <TableHeader className="sticky top-0 bg-white dark:bg-zinc-950 z-[1] [&_tr]:border-0 [&_tr]:shadow-[inset_0_-1px_0] [&_tr]:shadow-border">
        <TableRow>
          {[...Array(10)].map((column, index) => (
            <TableHead key={index}>
              <Skeleton className="h-6 w-full" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(10)].map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {[...Array(10)].map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton className="h-6 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function DataTablePaginationSkeleton() {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        <Skeleton className="h-4 w-[100px]" />
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Skeleton className="h-8 w-[70px]" />
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          <Skeleton className="h-4 w-[50px]" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}

export function DataTableToolbarSkeleton() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Skeleton className="h-8 w-[150px] lg:w-[250px]" />

          {[...Array(2)].map((_, index) => (
            <Skeleton key={index} className="h-8 w-[100px]" />
          ))}

          <Skeleton className="h-8 w-[100px]" />
        </div>
        <Skeleton className="h-8 w-[100px]" />
      </div>
    </>
  );
}
