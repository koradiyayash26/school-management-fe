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
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
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
import { useMutation } from "@tanstack/react-query";
import { deleteStandard } from "@/services/standard-service";
import { useGetStandard } from "@/hooks/use-standard";

const headers = [
  { label: "ID", value: "id" },
  { label: "GR Number", value: "grno" },
  { label: "Last Name", value: "last_name" },
  { label: "First Name", value: "first_name" },
  { label: "Middle Name", value: "middle_name" },
  { label: "Gender", value: "gender" },
  { label: "Birth Date", value: "birth_date" },
  { label: "Mobile Number", value: "mobile_no" },
  { label: "Address", value: "address" },
  { label: "City", value: "city" },
  { label: "District", value: "district" },
  { label: "Standard", value: "standard" },
  { label: "Section", value: "section" },
  { label: "Last School", value: "last_school" },
  { label: "Admission Standard", value: "admission_std" },
  { label: "Admission Date", value: "admission_date" },
  { label: "Religion", value: "religion" },
  { label: "Category", value: "category" },
  { label: "Caste", value: "caste" },
  { label: "UDISE Number", value: "udise_no" },
  { label: "Aadhar Number", value: "aadhar_no" },
  { label: "Account Number", value: "account_no" },
];

const StandardDetailPage = () => {
  const { id } = useParams();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [studentId, setStudentId] = useState();
  const [openAlert, setOpenAlert] = useState(false);

  const { data, isLoading, error, refetch } = useGetStandard(id);
  const students = data?.data || [];

  const startIndex = page * pageSize;
  const endIndex = (page + 1) * pageSize;

  const visibleStudents = students.slice(startIndex, endIndex);

  const handlePageSizeChange = (value) => {
    setPageSize(parseInt(value));
    setPage(0);
  };

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

  if (isLoading) {
    return <>Loading...</>;
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
      <h1 className="uppercase">
        STUDENTS OF <span className="underline font-bold"> {id} </span>
      </h1>

      {visibleStudents.length !== 0 ? (
        <div>
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <Input
              className="w-full md:max-w-sm mb-2 md:mb-0  md:mr-2"
              placeholder="Search By Name"
              onChange={(e) => setSearch(e.target.value)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[160px]">
                  {pageSize <= 10
                    ? "Items per page"
                    : pageSize == "9999"
                    ? "Show All"
                    : pageSize}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup
                  value={pageSize.toString()}
                  onValueChange={(value) => handlePageSizeChange(value)}
                >
                  <DropdownMenuRadioItem value="10">10</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="20">20</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="30">30</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="40">40</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="50">50</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="9999">
                    Show All
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ScrollArea className="rounded-md border w-full h-[calc(80vh-120px)]">
            <Table className="relative">
              <TableHeader>
                <TableRow>
                  {headers.map((header, index) => (
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
                      {headers.map((header) => (
                        <TableCell key={header.value}>
                          {student[header.value] == 13
                            ? "Balvatika"
                            : student[header.value] || "None"}
                        </TableCell>
                      ))}
                      <TableCell className="">
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
        </div>
      ) : (
        "No Data Found"
      )}
      {visibleStudents.length && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground"></div>
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={() => setPage(Math.max(page - 1, 0))}
              size="sm"
              disabled={page === 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage(page + 1)}
              size="sm"
              disabled={endIndex >= students.length}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default StandardDetailPage;
