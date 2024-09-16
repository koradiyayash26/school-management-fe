import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
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

const headers = [
  { label: "Year", value: "year" },
  { label: "Standard", value: "standard" },
];

function StudentUpdatePage() {
  const { data, isLoading, error } = useStudentUpdateStdYearTemplate();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const students = data?.data;
  const startIndex = page * pageSize;
  const endIndex = (page + 1) * pageSize;

  const filteredStudents = students?.filter((student) => {
    return search.toLowerCase() === ""
      ? student
      : student.year.toLowerCase().includes(search);
  });

  const visibleStudents = filteredStudents?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredStudents?.length / pageSize);

  const handlePageSizeChange = (value) => {
    setPageSize(parseInt(value));
    setPage(0);
  };

  if (isLoading)
    return (
      <>
        <Spinner />
      </>
    );

  if (error) return <>Error</>;

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
                        : student[header.value] || "None"}
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
      <div className="w-full flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 py-4 text-sm">
        <div className="w-full sm:w-auto flex items-center justify-center sm:justify-start text-muted-foreground">
          <span className="text-center sm:text-left">
            Showing {startIndex + 1}-
            {Math.min(endIndex, filteredStudents?.length)} of{" "}
            {filteredStudents?.length}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium hidden md:hidden lg:inline sm:inline ">
            Rows per page
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 w-[70px]">
                {pageSize}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {[10, 20, 30, 40, 50].map((size) => (
                <DropdownMenuItem
                  key={size}
                  onSelect={() => handlePageSizeChange(size)}
                >
                  {size}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage(Math.max(page - 1, 0))}
                  disabled={page === 0}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  onClick={() => setPage(0)}
                  isActive={page === 0}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {page > 1 && <PaginationEllipsis className="hidden sm:flex" />}
              {page !== 0 && page !== totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink isActive>{page + 1}</PaginationLink>
                </PaginationItem>
              )}
              {page < totalPages - 2 && (
                <PaginationEllipsis className="hidden sm:flex" />
              )}
              {totalPages > 1 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setPage(totalPages - 1)}
                    isActive={page === totalPages - 1}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage(Math.min(page + 1, totalPages - 1))}
                  disabled={page === totalPages - 1}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
}

export default StudentUpdatePage;
