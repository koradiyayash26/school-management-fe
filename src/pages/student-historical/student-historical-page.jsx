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
import { useStudentHistorical } from "@/hooks/use-student-historical";
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
import ActionsPopupStudentHistorical from "@/components/student-historical/data-table-row-action";
import { useMutation } from "@tanstack/react-query";
import { deleteStudentHistorical } from "@/services/student-historical-service";
import Spinner from "@/components/spinner/spinner";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const headers = [
  { label: "Name", value: "name" },
  { label: "Year", value: "year" },
  { label: "Standard", value: "standard" },
  { label: "Note", value: "note" },
  { label: "Update Date", value: "update_date" },
];

function StudentHistoricalPage() {
  const { data, isLoading, error, refetch } = useStudentHistorical();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const [openAlert, setOpenAlert] = useState(false);
  const [studentId, setStudentId] = useState("");

  const students = data?.data;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const filteredStudents = (students ?? []).filter((student) =>
    ["name", "year", "update_date"].some((field) =>
      student[field]?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const visibleStudents = filteredStudents.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(parseInt(newSize));
    setPage(1);
  };

  const openAlertDeleteBox = (id) => {
    setStudentId(id);
    setOpenAlert(true);
  };

  const mutation = useMutation({
    mutationFn: (studentId) => deleteStudentHistorical(studentId),
    onSuccess: () => {
      refetch();
      setOpenAlert(false);
      toast.success("Student Delete Successfully");
    },
  });

  const totalPages = Math.ceil(filteredStudents.length / pageSize);

  if (isLoading)
    return (
      <>
        <Spinner />
      </>
    );

  if (error) return <>Error</>;

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
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
              This will permanently delete and remove your data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => mutation.mutate(studentId)}
              className="bg-[red] text-white hover:bg-red-500"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <h1 className="uppercase mb-4 text-2xl font-bold">STUDENT HISTORICAL</h1>
      <div className="block md:flex md:justify-between gap-2">
        <div className="w-full">
          <Input
            className="w-full md:max-w-sm mb-2 md:mb-0  md:mr-2"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
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
            {filteredStudents.length === 0 ? (
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
                      className="capitalize text-center whitespace-nowrap"
                    >
                      {header.value === "standard" && student.standard === "13"
                        ? "Balvatika"
                        : student[header.value] || "-"}
                    </TableCell>
                  ))}
                  <TableCell className="z-[1]">
                    <ActionsPopupStudentHistorical
                      id={student.id}
                      openAlertDeleteBox={openAlertDeleteBox}
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

export default StudentHistoricalPage;
