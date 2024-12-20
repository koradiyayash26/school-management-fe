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
import {
  useStudents,
  useStudentUpdateAcademicYearHistory,
} from "@/hooks/use-student";
import { useMutation } from "@tanstack/react-query";
import { bulkImport, deleteStudent } from "@/services/student-service";
import { Link } from "react-router-dom";
import Spinner from "@/components/spinner/spinner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileUp,
  X,
} from "lucide-react";
import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { getSchoolType } from "@/hooks/use-school-type";
import { BreadcrumbComponent } from "@/components/Breadcrumb";

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
  { label: "Academic Year", value: "academic_year__year" },
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

function StudentDetailsDialog({ student, open, onOpenChange }) {
  const { data, isLoading, error, refetch } =
    useStudentUpdateAcademicYearHistory(student.id);

  let academic_history = data?.data || [];

  const details = [
    {
      label: "Personal Information",
      items: [
        {
          label: "Student Image",
          value: student.student_img,
          isImage: true,
        },
        {
          label: "Full Name",
          value: `${student.first_name} ${student.middle_name} ${student.last_name}`,
        },
        { label: "GR Number", value: student.grno },
        { label: "Mother's Name", value: student.mother_name },
        { label: "Gender", value: student.gender },
        { label: "Birth Date", value: student.birth_date },
        { label: "Birth Place", value: student.birth_place },
        { label: "Mobile", value: student.mobile_no },
      ],
    },
    {
      label: "Academic Information",
      items: [
        {
          label: "Standard",
          value: student.standard === "13" ? "Balvatika" : student.standard,
        },
        { label: "Section", value: student.section },
        { label: "Academic Year", value: student.academic_year__year },
        { label: "Status", value: student.status },
        { label: "UDISE Number", value: student.udise_no },
      ],
    },
    {
      label: "Address Information",
      items: [
        { label: "Address", value: student.address },
        { label: "City", value: student.city },
        { label: "District", value: student.district },
      ],
    },
    {
      label: "Bank Details",
      items: [
        { label: "Bank Name", value: student.bank_name },
        { label: "Account Number", value: student.account_no },
        { label: "IFSC Code", value: student.ifsc_code },
        { label: "Aadhar Number", value: student.aadhar_no },
      ],
    },
    {
      label: "Academic History",
      items:
        academic_history.map((history) => ({
          label: `Academic Year: ${history.academic_year}`,
          value: (
            <span className="space-y-1 block">
              <span className="block">
                Standard:{" "}
                {history.standard === "13" ? "Balvatika" : history.standard}
              </span>
              <span className="block">Section: {history.section}</span>
              <span className="block">Note: {history.note || "-"}</span>
              <span className="text-sm text-muted-foreground block">
                Updated: {new Date(history.update_date).toLocaleDateString()}
              </span>
            </span>
          ),
          isFullWidth: true,
        })) || [],
      isHistory: true,
    },
  ];

  if (isLoading)
    return (
      <>
        <Spinner />
      </>
    );

  if (error) {
    return (
      <>
        <div>{error.message}</div>
      </>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[85vw] md:max-w-[75vw] lg:max-w-[65vw] xl:max-w-[55vw] max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold">
            Student Information
          </DialogTitle>
          <DialogDescription className="text-sm md:text-base">
            Detailed information about the student
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] w-full rounded-md">
          <div className="space-y-6 py-4 px-1">
            {details.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <h3 className="text-lg md:text-xl font-semibold text-primary">
                  {section.label}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={cn(
                        "p-4 rounded-lg border bg-card transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        (item.value?.length > 50 || item.isImage) &&
                          "sm:col-span-2 lg:col-span-3"
                      )}
                    >
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">
                          {item.label}
                        </Label>
                        {item.isImage ? (
                          item.value ? (
                            <div className="flex justify-center">
                              <img
                                src={`http://127.0.0.1:8000/media/${item.value}`}
                                alt="Student"
                                className="h-48 w-auto object-contain rounded-md"
                              />
                            </div>
                          ) : (
                            <p className="text-sm md:text-base font-medium">
                              No image available
                            </p>
                          )
                        ) : (
                          <p className="text-sm md:text-base font-medium break-words">
                            {item.value || "-"}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <DialogFooter className="sm:justify-between mt-4 gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
            >
              Close
            </Button>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                className="flex-1 sm:flex-none"
                onClick={() => {
                  window.print();
                }}
              >
                Print
              </Button>
              <Link
                to={`/student/edit/${student.id}`}
                className="flex-1 sm:flex-none"
              >
                <Button className="w-full">Edit</Button>
              </Link>
            </div>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function StudentsPage() {
  const { data, isLoading, error, refetch } = useStudents();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [studentId, setStudentId] = useState();

  const [isOpen, setIsOpen] = useState(false);
  const [isPassLoading, setIsPassLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [importMessage, setImportMessage] = useState(null);
  const [importError, setImportError] = useState(null);

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
      handlePageChange(1);
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

  const excelFileGeneralRegister = async () => {
    try {
      const response = await apiClient.get("/export-general-register/", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        params: {
          school_type: getSchoolType(),
        },
        responseType: "blob", // This is important
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `General Register of ${getSchoolType()}.xlsx`;
      document.body.appendChild(link); // Needed for Firefox
      link.click();

      window.URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    }
  };

  const mutationBulkImport = useMutation({
    mutationFn: (formData) => bulkImport(formData),
    onSuccess: (res) => {
      setIsPassLoading(false);
      setIsOpen(false);
      refetch();
      setImportMessage(res.data.message);
      console.log(res);
      setTimeout(() => {
        toast.success("Bulk Import Successfully");
      }, 1000);
      setTimeout(() => {
        setImportMessage(null);
      }, 5000);
    },
    onError: (error) => {
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        setImportError(error.response.data.errors);
      }
      setIsOpen(false);
      setIsPassLoading(false);
      setTimeout(() => {
        setImportError(null);
      }, 5000);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setFileError("Please select a file");
      return;
    }
    setIsPassLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    mutationBulkImport.mutate(formData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();

      if (["xlsx", "xls"].includes(fileExtension)) {
        setSelectedFile(file);
        setFileError("");
      } else {
        setSelectedFile(null);
        setFileError("Please select an Excel file (.xlsx or .xls)");
      }
    } else {
      setSelectedFile(null);
      setFileError("");
    }
  };

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  if (isLoading)
    return (
      <>
        <Spinner />
      </>
    );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
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
        {/* PAth */}
        <BreadcrumbComponent customItems={[{ label: "General register" }]} />
        {/* PAth */}
        <h1 className="uppercase text-2xl font-bold mb-4">GENERAL REGISTER</h1>
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
            <Button onClick={excelFileGeneralRegister}>Download as XLS</Button>
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
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <div className="block md:flex gap-4">
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <FileUp className="w-6 h-6" />
                  </Button>
                </DialogTrigger>
              </div>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-left mb-2">
                    Upload Excel File
                  </DialogTitle>
                  <DialogDescription className="text-left">
                    Select excel file here. Click upload when you're done.
                  </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="file">Select File</Label>
                    <Input
                      id="file"
                      type="file"
                      onChange={handleFileChange}
                      accept=".xlsx,.xls"
                    />
                    {fileError && (
                      <p className="text-sm text-red-500">{fileError}</p>
                    )}
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      disabled={isPassLoading}
                    >
                      {isPassLoading ? "Uploading..." : "Upload"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {importError && (
          <div className="bg-red-100 rounded-sm border-l-4 border-red-500 text-red-700 p-4 relative">
            <h3 className="font-bold">Import Errors:</h3>
            <ul className="list-disc pl-5">
              {importError.map((error, index) => (
                <li key={index}>
                  GR No {error.grno}: {error.errors.join(", ")}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setImportError(false)}
              className="absolute top-0 right-0 mt-2 mr-2"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        )}
        {importMessage && (
          <div className="bg-green-100 rounded-sm border-l-4 border-green-500 text-green-700 p-2 relative">
            <p className="font-medium">{importMessage}</p>
            <button
              onClick={() => setImportMessage(false)}
              className="absolute top-0 right-0 mt-2 mr-2"
              aria-label="Close"
            >
              <X size={18} className="" />
            </button>
          </div>
        )}
        <ScrollArea className="rounded-md border w-full h-[calc(80vh-120px)]">
          <div ref={componentPDF} style={{ width: "100%" }}>
            <h1 className="hidden title-table">THINKERS GENERAL REGISTER</h1>
            <Table className="relative" id="print-excel">
              <TableHeader>
                <TableRow className="bg-muted/50">
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
                        Object.values(columnVisibility).filter(Boolean).length +
                        1
                      }
                    >
                      No Data Found
                    </TableCell>
                  </TableRow>
                ) : (
                  visibleStudents.map((student) => (
                    <TableRow
                      key={student.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => {
                        setSelectedStudent(student);
                        setShowDetails(true);
                      }}
                    >
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
                      <TableCell className="no-print z-[1]">
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
                  <Button
                    aria-label="Go to last page"
                    variant="outline"
                    size="icon"
                    className="size-8 lg:flex"
                    onClick={() => handlePageChange(1)}
                    disabled={page === 1}
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
                  disabled={page === 1}
                >
                  <ChevronLeft className="size-4" aria-hidden="true" />
                </Button>
                <Button
                  aria-label="Go to last page"
                  variant="outline"
                  size="icon"
                  className="size-8 lg:flex"
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, page + 1))
                  }
                  disabled={page === totalPages}
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
                    disabled={page === totalPages}
                  >
                    <ChevronsRight className="size-4" aria-hidden="true" />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
        {selectedStudent && (
          <StudentDetailsDialog
            student={selectedStudent}
            open={showDetails}
            onOpenChange={setShowDetails}
          />
        )}
      </>
    </>
  );
}

export default StudentsPage;
