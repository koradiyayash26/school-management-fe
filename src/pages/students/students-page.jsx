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
import { ClipboardList, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useReactToPrint } from "react-to-print";
import Spinner from "@/components/spinner/spinner";

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

function StudentsPage() {
  const { data, isLoading, error, refetch } = useStudents();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [studentId, setStudentId] = useState();

  const componentPDF = useRef();

  const students = data?.data;

  const startIndex = page * pageSize;
  const endIndex = (page + 1) * pageSize;

  const filteredStudents = students?.filter((student) => {
    return search.toLowerCase() === ""
      ? student
      : student.first_name.toLocaleLowerCase().includes(search) ||
          student.last_name.toLocaleLowerCase().includes(search) ||
          student.middle_name.toLocaleLowerCase().includes(search);
  });

  const visibleStudents = filteredStudents?.slice(startIndex, endIndex);

  const handlePageSizeChange = (value) => {
    setPageSize(parseInt(value));
    setPage(0);
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

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "GENERAL REGISTER",
    onAfterPrint: () => alert("PDF generated successfully"),
  });

  if (isLoading) return <><Spinner/></>;

  if (error) return <>Error</>;

  return (
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
              This will permanently delete student and remove your data from our
              servers.
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
      <div className="block md:flex md:justify-between gap-2">
        <div className="w-full">
          <Input
            className="w-full md:max-w-sm mb-2 md:mb-0  md:mr-2"
            placeholder="Search By Name"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 md:m-0 mt-4">
          <Link to="/student/add">
            <Button>Add</Button>
          </Link>
          {!students || filteredStudents.length === 0 ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="cursor-not-allowed bg-[gray] hover:bg-[gray]">
                    PDF
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Not Print Empty Data</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button onClick={generatePDF}>PDF</Button>
          )}
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
        </div>
      </div>
      <ScrollArea className="rounded-md border w-full h-[calc(80vh-120px)]">
        <div ref={componentPDF} style={{ width: "100%" }}>
          <h1 className="hidden title-table">THINKERS GENERAL REGISTER</h1>
          <Table className="relative" id="print-excel">
            <TableHeader>
              <TableRow>
                {headers.map((header, index) => (
                  <TableHead className="whitespace-nowrap" key={index}>{header.label}</TableHead>
                ))}
                <TableHead className="no-print bg-[#151518]">
                  Actions
                </TableHead>
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
                      <TableCell key={header.value}>
                        {(header.value === "standard" ||
                          header.value === "admission_std") &&
                        student[header.value] == 13
                          ? "Balvatika"
                          : student[header.value] || "None"}
                      </TableCell>
                    ))}

                    <TableCell className="no-print sticky right-0 z-[1] bg-[#151518]">
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
      <div className="block text-center  md:flex md:items-center md:justify-end md:space-x-2 py-4">
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
        <div className="space-x-2 md:m-0 mt-2">
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
    </>
  );
}

export default StudentsPage;
