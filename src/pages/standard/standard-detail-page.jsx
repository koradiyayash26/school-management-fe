import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ActionsPopup from "@/components/ui/data-table-row-actions";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
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
import { useMutation } from "@tanstack/react-query";
import { deleteStandard } from "@/services/standard-service";
import { useGetStandard } from "@/hooks/use-standard";
import Spinner from "@/components/spinner/spinner";
import { ChevronDown } from "lucide-react";

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

const StandardDetailPage = () => {
  const { id } = useParams();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [studentId, setStudentId] = useState();
  const [openAlert, setOpenAlert] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(
    headers.slice(0, 7).map((h) => h.value)
  );

  const { data, isLoading, error, refetch } = useGetStandard(id);
  const students = data?.data || [];

  const startIndex = page * pageSize;
  const endIndex = (page + 1) * pageSize;

  const visibleStudents = students.slice(startIndex, endIndex);

  const toggleColumnVisibility = (value) => {
    setVisibleColumns((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const totalPages = Math.ceil(students.length / pageSize);

  const openAlertDeleteBox = (id) => {
    setStudentId(id);
    setOpenAlert(true);
  };

  const mutation = useMutation({
    mutationFn: (studentId) => deleteStandard(studentId),
    onSuccess: () => {
      refetch();
      setOpenAlert(false);
      toast.success("Student Delete Successfully");
    },
  });

  const handleDeleteStudent = async (studentId) => {
    mutation.mutate(studentId);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(Number(newSize));
    setPage(0); // Reset to first page when changing page size
  };

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }
  if (error) {
    return <>Error</>;
  }

  return (
    <>
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
              This will permanently delete student and remove your data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteStudent(studentId)}
              className="bg-[red] text-white hover:bg-red-500"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <h1 className="uppercase mb-4 text-2xl font-bold">
        STUDENTS OF{" "}
        <span className="underline font-bold">
          {id == "13" ? "Balvatika" : id}
        </span>
      </h1>

      {visibleStudents.length !== 0 ? (
        <div>
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
            <Input
              className="w-full md:max-w-sm"
              placeholder="Search By Name"
              onChange={(e) => setSearch(e.target.value)}
            />
            <DropdownMenu>
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
                        checked={visibleColumns.includes(header.value)}
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
          <ScrollArea className="rounded-md border w-full h-[calc(80vh-180px)]">
            <Table className="relative">
              <TableHeader>
                <TableRow>
                  {headers
                    .filter((header) => visibleColumns.includes(header.value))
                    .map((header, index) => (
                      <TableHead key={index}>{header.label}</TableHead>
                    ))}
                  <TableHead className="">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleStudents
                  .filter((student) => {
                    return search.toLocaleLowerCase() === ""
                      ? student
                      : student.first_name
                          .toLocaleLowerCase()
                          .includes(search) ||
                          student.last_name
                            .toLocaleLowerCase()
                            .includes(search) ||
                          student.middle_name
                            .toLocaleLowerCase()
                            .includes(search);
                  })
                  .map((student) => (
                    <TableRow key={student.id}>
                      {headers
                        .filter((header) =>
                          visibleColumns.includes(header.value)
                        )
                        .map((header) => (
                          <TableCell
                            key={header.value}
                            className="whitespace-nowrap"
                          >
                            {student[header.value] == 13
                              ? "Balvatika"
                              : student[header.value] || "None"}
                          </TableCell>
                        ))}
                      <TableCell className="sticky right-0">
                        <ActionsPopup
                          id={student.id}
                          openAlertDeleteBox={openAlertDeleteBox}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <div className="w-full flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 py-4 text-sm">
            <div className="w-full sm:w-auto flex items-center justify-center sm:justify-start text-muted-foreground">
              <span className="dark:text-white text-black font-medium text-center sm:text-left">
                Showing {startIndex + 1}-{Math.min(endIndex, students.length)}{" "}
                of {students.length}.
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="dark:text-white font-medium text-black hidden md:hidden lg:inline sm:inline whitespace-nowrap">
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
                      // className="hidden sm:flex"
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
                  {page > 1 && (
                    <PaginationEllipsis className="hidden sm:flex" />
                  )}
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
                      onClick={() =>
                        setPage(Math.min(page + 1, totalPages - 1))
                      }
                      disabled={page === totalPages - 1}
                      // className="hidden sm:flex"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      ) : (
        "No Data Found"
      )}
    </>
  );
};

export default StandardDetailPage;
