"use client";

import React, { useRef, useState } from "react";
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
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import toast, { Toaster } from "react-hot-toast";
import ActionsPopup from "@/components/ui/data-table-row-actions";
import { useStudents } from "@/hooks/use-student";
import { useMutation } from "@tanstack/react-query";
import { deleteStudent } from "@/services/student-service";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useReactToPrint } from "react-to-print";
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
  { label: "Mother Name", value: "mother_name" },
  { label: "Gender", value: "gender" },
  { label: "Birth Date", value: "birth_date" },
  { label: "Birth Place", value: "birth_place" },
  { label: "Mobile Number", value: "mobile_no" },
  { label: "Address", value: "address" },
  { label: "City", value: "city" },
  { label: "District", value: "district" },
  { label: "Standard", value: "standard" },
  { label: "Section", value: "section" },
  { label: "Last School", value: "last_school" },
  { label: "Admission Standard", value: "admission_std" },
  { label: "Admission Date", value: "admission_date" },
  { label: "Left School Standard", value: "left_school_std" },
  { label: "Left School Date", value: "left_school_date" },
  { label: "Religion", value: "religion" },
  { label: "Category", value: "category" },
  { label: "Caste", value: "caste" },
  { label: "UDISE Number", value: "udise_no" },
  { label: "Aadhar Number", value: "aadhar_no" },
  { label: "Account Number", value: "account_no" },
  { label: "Name on Passbook", value: "name_on_passbook" },
  { label: "Bank Name", value: "bank_name" },
  { label: "IFSC Code", value: "ifsc_code" },
  { label: "Bank Address", value: "bank_address" },
  { label: "Reason", value: "reason" },
  { label: "Note", value: "note" },
  { label: "Assessment", value: "assessment" },
  { label: "Progress", value: "progress" },
  { label: "Status", value: "status" },
];

const defaultVisibleColumns = [
  "id",
  "grno",
  "last_name",
  "first_name",
  "middle_name",
  "birth_place",
  "mobile_no",
  "city",
  "district",
  "standard",
];

function StudentsPage() {
  const { data, isLoading, error, refetch } = useStudents();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [studentId, setStudentId] = useState();

  const componentPDF = useRef();

  const students = data?.data || [];

  const filteredStudents =
    students?.filter((student) => {
      return search.toLowerCase() === ""
        ? student
        : student.first_name.toLowerCase().includes(search) ||
            student.last_name.toLowerCase().includes(search) ||
            student.middle_name.toLowerCase().includes(search);
    }) || [];

  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  const visibleStudents = filteredStudents.slice(startIndex, endIndex);

  const totalPages = Math.ceil((filteredStudents?.length || 0) / pageSize);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(parseInt(newSize));
    setPage(1); // Reset to first page when changing page size
  };

  const openAlertDeleteBox = (id) => {
    setStudentId(id);
    setOpenAlert(true);
  };

  const mutation = useMutation({
    mutationFn: (params) => deleteStudent(params.id),
    onSuccess: () => {
      refetch();
      setOpenAlert(false);
      toast.success("Student Delete Successfully");
    },
  });

  const [columnVisibility, setColumnVisibility] = useState(() => {
    const initialVisibility = {};
    headers.forEach((header) => {
      initialVisibility[header.value] = defaultVisibleColumns.includes(
        header.value
      );
    });
    return initialVisibility;
  });

  const toggleColumnVisibility = (columnId) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  if (isLoading)
    return (
      <>
        <Spinner />
      </>
    );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {students && students.length > 0 ? (
        <>
          {" "}
          <style>
            {`
          @media print {
            .no-print {
              display: none;
            }
            .title-table{
              display: block;
              text-align:center;
              margin:20px 0px;
              font-size:20px;
            }
          }
        `}
          </style>
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: "",
              duration: 5000,
              style: {
                background: "#363636",
                color: "#fff",
              },

              // Default options for specific types
              success: {
                duration: 3000,
                theme: {
                  primary: "green",
                  secondary: "black",
                },
              },
            }}
          />
          <AlertDialog open={openAlert}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete student and remove your data from
                  our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => mutation.mutate({ id: studentId })}
                  className="bg-[red] text-white hover:bg-red-500"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <h1>GENERAL REGISTER</h1>
          <div className="block md:flex md:justify-between gap-2 mb-4">
            <div className="w-full md:w-auto">
              <Input
                className="w-full md:w-64 mb-2 md:mb-0"
                placeholder="Search By Name"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <Link to="/student/add">
                <Button>Add</Button>
              </Link>
              {!students || filteredStudents.length === 0 ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className="cursor-not-allowed bg-[gray] hover:bg-[gray]">
                        Download as XLS
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="">Not Print Empty Data</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                // <Button>
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-xls-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  table="print-excel"
                  filename="tablexls"
                  sheet="tablexls"
                  buttonText="Download as XLS"
                />
                // </Button>
              )}
              <DropdownMenu className="">
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Columns</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <ScrollArea className="h-[300px] overflow-y-auto">
                    <div className="p-2">
                      <h4 className="mb-2 font-semibold">Toggle Columns</h4>
                      {headers.map((header) => (
                        <DropdownMenuCheckboxItem
                          key={header.value}
                          className="capitalize"
                          checked={columnVisibility[header.value]}
                          onCheckedChange={() =>
                            toggleColumnVisibility(header.value)
                          }
                        >
                          {header.label}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </div>
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <ScrollArea className="rounded-md border w-full h-[calc(80vh-120px)]">
            <div ref={componentPDF} style={{ width: "100%" }}>
              <h1 className="hidden title-table">THINKERS GENERAL REGISTER</h1>
              <Table className="relative" id="print-excel">
                <TableHeader>
                  <TableRow>
                    {headers.map(
                      (header, index) =>
                        columnVisibility[header.value] && (
                          <TableHead className="whitespace-nowrap" key={index}>
                            {header.label}
                          </TableHead>
                        )
                    )}
                    <TableHead className="no-print">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!students || filteredStudents.length === 0 ? (
                    <TableRow className="text-center">
                      <TableCell
                        colSpan={
                          Object.values(columnVisibility).filter(Boolean)
                            .length + 1
                        }
                      >
                        No Data Found
                      </TableCell>
                    </TableRow>
                  ) : (
                    visibleStudents.map((student) => (
                      <TableRow key={student.id}>
                        {headers.map(
                          (header) =>
                            columnVisibility[header.value] && (
                              <TableCell
                                key={header.value}
                                className="whitespace-nowrap"
                              >
                                {(header.value === "standard" ||
                                  header.value === "admission_std") &&
                                student[header.value] == 13
                                  ? "Balvatika"
                                  : student[header.value] || "-"}
                              </TableCell>
                            )
                        )}
                        <TableCell className="no-print sticky right-0 z-[1]">
                          <ActionsPopup
                            id={student.id}
                            openAlertDeleteBox={openAlertDeleteBox}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <div className="flex flex-col gap-4 md:gap-0 md:flex-col-2 lg:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-2 py-4">
            <div className="text-sm font-medium dark:text-muted-foreground order-2 sm:order-1">
              {filteredStudents?.length > 0
                ? `Showing ${Math.min(
                    (page - 1) * pageSize + 1,
                    filteredStudents.length
                  )} to ${Math.min(
                    page * pageSize,
                    filteredStudents.length
                  )} of ${filteredStudents.length} entries`
                : "No entries to show"}
            </div>
            <div className="flex items-center space-x-2 order-1 sm:order-2">
              <p className="text-sm font-medium hidden sm:inline">
                Rows per page
              </p>
              <Select
                value={pageSize.toString()}
                onValueChange={handlePageSizeChange}
              >
                <SelectTrigger className="h-8 w-[70px]">
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
                    <PaginationPrevious
                      onClick={() => handlePageChange(Math.max(1, page - 1))}
                      disabled={page === 1}
                    />
                  </PaginationItem>
                  <PaginationItem className="hidden sm:inline-flex">
                    <PaginationLink
                      onClick={() => handlePageChange(1)}
                      isActive={page === 1}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  {page > 3 && (
                    <PaginationItem className="hidden sm:inline-flex">
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  {page > 2 && (
                    <PaginationItem className="hidden sm:inline-flex">
                      <PaginationLink
                        onClick={() => handlePageChange(page - 1)}
                      >
                        {page - 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  {page !== 1 && page !== totalPages && (
                    <PaginationItem className="hidden sm:inline-flex">
                      <PaginationLink isActive>{page}</PaginationLink>
                    </PaginationItem>
                  )}
                  {page < totalPages - 1 && (
                    <PaginationItem className="hidden sm:inline-flex">
                      <PaginationLink
                        onClick={() => handlePageChange(page + 1)}
                      >
                        {page + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  {page < totalPages - 2 && (
                    <PaginationItem className="hidden sm:inline-flex">
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  {totalPages > 1 && (
                    <PaginationItem className="hidden sm:inline-flex">
                      <PaginationLink
                        onClick={() => handlePageChange(totalPages)}
                        isActive={page === totalPages}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        handlePageChange(Math.min(totalPages, page + 1))
                      }
                      disabled={page === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </>
      ) : (
        <div>No students data available</div>
      )}
    </>
  );
}

export default StudentsPage;
