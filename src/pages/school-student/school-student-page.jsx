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
import { Link } from "react-router-dom";
import ActionsPopupSchoolStudent from "@/components/school-student/data-table-row-action";
import { useSchoolStudents } from "@/hooks/use-school-student";
import Spinner from "@/components/spinner/spinner";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ChevronDown } from "lucide-react";

const headers = [
  { label: "ID", value: "id" },
  { label: "Standard", value: "standard" },
  { label: "Grno", value: "grno" },
  { label: "First Name", value: "first_name" },
  { label: "Middle Name", value: "middle_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Year", value: "year" },
  { label: "Note", value: "note" },
  { label: "Update Date", value: "update_date" },
];

function SchoolStudentPage() {
  const { data, isLoading, error } = useSchoolStudents();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const students = data?.data || [];
  const startIndex = page * pageSize;
  const endIndex = (page + 1) * pageSize;

  const filteredStudents = students.filter((student) =>
    ["first_name", "middle_name", "last_name", "year", "standard", "grno"].some(
      (field) =>
        student[field]?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const visibleStudents = filteredStudents.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredStudents.length / pageSize);


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
      <h1 className="uppercase text-2xl font-bold mb-4">SCHOOL STUDENT</h1>
      <div className="block md:flex md:justify-between gap-2">
        <div className="w-full">
          <Input
            className="w-full md:max-w-sm mb-2 md:mb-0 md:mr-2"
            placeholder="Search by year and standard"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 md:m-0 mt-4">
          <Link to="/school-student/add">
            <Button>Add</Button>
          </Link>
        </div>
      </div>
      <ScrollArea className="rounded-md border w-full h-[calc(80vh-120px)]">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index}>{header.label}</TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          {!students || filteredStudents.length === 0 ? (
            <TableBody>
              <TableRow className="text-center">
                <TableCell
                  colSpan={headers.length + 1}
                  className="uppercase text-lg"
                >
                  No Data Found
                </TableCell>
              </TableRow>
            </TableBody>
          ) : null}
          <TableBody>
            {visibleStudents.map((student) => (
              <TableRow key={student.id}>
                {headers.map((header) => (
                  <TableCell key={header.value} className="capitalize">
                    {header.value === "grno"
                      ? student.student.grno
                      : header.value === "first_name"
                      ? student.student.first_name
                      : header.value === "middle_name"
                      ? student.student.middle_name
                      : header.value === "last_name"
                      ? student.student.last_name
                      : header.value === "standard"
                      ? student.standard === "13"
                        ? "Balvatika"
                        : student.standard
                      : student[header.value] || "None"}
                  </TableCell>
                ))}
                <TableCell className="">
                  <ActionsPopupSchoolStudent id={student.id} />
                </TableCell>
              </TableRow>
            ))}
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
      </div>
    </>
  );
}

export default SchoolStudentPage;
