import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import ActionsPopup from "@/components/ui/data-table-row-actions";
import { useCertificate } from "@/hooks/use-certificate";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  SearchX,
} from "lucide-react";
import Spinner from "@/components/spinner/spinner";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const headers = [
  { label: "ID", value: "id" },
  { label: "GR Number", value: "grno" },
  { label: "Last Name", value: "last_name" },
  { label: "First Name", value: "first_name" },
  { label: "Middle Name", value: "middle_name" },
  { label: "Gender", value: "gender" },
  { label: "Birth Date", value: "birth_date" },
  { label: "Standard", value: "standard" },
  { label: "Section", value: "section" },
  { label: "Status", value: "status" },
];

function CertificatePage() {
  const { data, isLoading, error } = useCertificate();
  let students = data?.data || [];

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleStudents = students.slice(startIndex, endIndex);

  const totalPages = Math.ceil(students.length / pageSize);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(parseInt(newSize));
    setPage(1); // Reset to first page when changing page size
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredStudents = students.filter((student) => {
    return search.toLocaleLowerCase() === ""
      ? student
      : student.first_name.toLocaleLowerCase().includes(search) ||
          student.last_name.toLocaleLowerCase().includes(search) ||
          student.middle_name.toLocaleLowerCase().includes(search);
  });

  return (
    <>
      <h1 className="uppercase text-2xl font-bold mb-4">certificate</h1>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <Input
          className="w-full md:max-w-sm mb-2 md:mb-0 md:mr-2"
          placeholder="Search By Name"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ScrollArea className="rounded-md border w-full h-[calc(80vh-120px)]">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index}>{header.label}</TableHead>
              ))}
              <TableHead className="">Certificate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleStudents.length === 0 || !students ? (
              <TableRow className="text-start md:text-center">
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
                    <TableCell key={header.value} className="whitespace-nowrap">
                      {(header.value === "standard" ||
                        header.value === "admission_std") &&
                      student[header.value] == 13
                        ? "Balvatika"
                        : student[header.value] || "None"}
                    </TableCell>
                  ))}
                  <TableCell className="">
                    <ActionsPopup
                      Bonafide="Bonafide"
                      Birth="Birth Certificate"
                      id={student.id}
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

export default CertificatePage;
