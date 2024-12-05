import React, { useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useStudentUpdateStdYearTemplate } from "@/hooks/use-student-update";
import { Link } from "react-router-dom";
import ActionsPopupStudentUpdate from "@/components/student-update/data-table-row-action";
import Spinner from "@/components/spinner/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const headers = [
  { label: "Year", value: "year" },
  { label: "Standard", value: "standard" },
];

function StudentUpdatePage() {
  const { data, isLoading, error } = useStudentUpdateStdYearTemplate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const students = data?.data;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const filteredStudents = students?.filter((student) => {
    return search.toLowerCase() === ""
      ? student
      : student.year.toLowerCase().includes(search);
  });

  const visibleStudents = filteredStudents?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredStudents?.length / pageSize);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(parseInt(newSize));
    setPage(1);
  };

  if (isLoading)
    return (
      <>
        <Spinner />
      </>
    );

  if (error) return <> {error.message}</>;

  return (
    <>
      <h1 className="uppercase mb-4 text-2xl font-bold">STUDENT UPDATE</h1>
      <div className="block md:flex md:justify-between gap-2">
        <div className="w-full">
          <Input
            className="w-full md:max-w-sm mb-2 md:mb-0  md:mr-2"
            placeholder="Search By Year"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 md:m-0 mt-4">
          <Link to="/educational">
            <Button>Update History</Button>
          </Link>
          <Link to="/update/add">
            <Button>Add</Button>
          </Link>
        </div>
      </div>
      <ScrollArea className="rounded-md border w-full h-[calc(80vh-120px)]">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index} className="text-center">
                  {header.label}
                </TableHead>
              ))}
              <TableHead className="">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!students || filteredStudents.length === 0 ? (
              <TableRow className="text-center">
                <TableCell
                  colSpan={headers.length + 1}
                  className="uppercase text-lg"
                >
                  No Data Found
                </TableCell>
              </TableRow>
            ) : (
              visibleStudents.map((student) => (
                <TableRow key={student.id}>
                  {headers.map((header) => (
                    <TableCell
                      key={header.value}
                      className="capitalize text-center"
                    >
                      {header.value === "standard" && student.standard === "13"
                        ? "Balvatika"
                        : student[header.value] || "-"}
                    </TableCell>
                  ))}
                  <TableCell>
                    <ActionsPopupStudentUpdate
                      std={student.standard}
                      year={student.year}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
        <div className="whitespace-nowrap text-sm dark:text-white text-black font-medium order-2 md:order-1">
          {filteredStudents?.length > 0
            ? `Showing ${Math.min(
                (page - 1) * pageSize + 1,
                filteredStudents.length
              )} - ${Math.min(page * pageSize, filteredStudents.length)} of ${
                filteredStudents.length
              }.`
            : "No entries to show"}
        </div>
        <div className="flex items-center space-x-2 order-1 sm:order-2">
          <p className="whitespace-nowrap text-sm font-medium hidden sm:inline">
            Rows per page
          </p>
          <Select
            value={pageSize.toString()}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger
              className={`h-8 w-[70px] ${
                filteredStudents.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="order-3 w-full sm:w-auto">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  aria-label="Go to last page"
                  variant="outline"
                  size="icon"
                  className="size-8 lg:flex"
                  onClick={() => handlePageChange(1)}
                  disabled={page === 1 || totalPages === 0}
                >
                  <ChevronsLeft className="size-4" aria-hidden="true" />
                </Button>
              </PaginationItem>
              <Button
                aria-label="Go to last page"
                variant="outline"
                size="icon"
                className="size-8 lg:flex"
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page === 1 || totalPages === 0}
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
              </Button>
              <Button
                aria-label="Go to last page"
                variant="outline"
                size="icon"
                className="size-8 lg:flex"
                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages || totalPages === 0}
              >
                <ChevronRight className="size-4" aria-hidden="true" />
              </Button>
              <PaginationItem>
                <Button
                  aria-label="Go to last page"
                  variant="outline"
                  size="icon"
                  className="size-8 lg:flex"
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, totalPages))
                  }
                  disabled={page === totalPages || totalPages === 0}
                >
                  <ChevronsRight className="size-4" aria-hidden="true" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
}

export default StudentUpdatePage;
