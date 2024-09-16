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
import { ChevronDown, SearchX } from "lucide-react";
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
  const { data, isLoading, error, refetch } = useCertificate();
  let students = data?.data || [];

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const startIndex = page * pageSize;
  const endIndex = (page + 1) * pageSize;

  const handlePageSizeChange = (value) => {
    setPageSize(parseInt(value));
    setPage(0);
  };

  if (isLoading) {
    return <Spinner />;
  }

  const filteredStudents = students.filter((student) => {
    return search.toLocaleLowerCase() === ""
      ? student
      : student.first_name.toLocaleLowerCase().includes(search) ||
          student.last_name.toLocaleLowerCase().includes(search) ||
          student.middle_name.toLocaleLowerCase().includes(search);
  });

  const visibleStudents = filteredStudents.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredStudents.length / pageSize);

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
      <div className="w-full flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 py-4 text-sm">
        <div className="w-full sm:w-auto flex items-center justify-center sm:justify-start text-muted-foreground">
          <span className="text-sm dark:text-white text-black font-medium order-2 md:order-1">
            Showing {startIndex + 1}-
            {Math.min(endIndex, filteredStudents.length)} of{" "}
            {filteredStudents.length}.
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
      </div>{" "}
    </>
  );
}

export default CertificatePage;
