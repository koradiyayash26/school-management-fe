import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
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
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UploadFileExamAdd} from "@/services/exam-service";
import { useReactToPrint } from "react-to-print";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import ReactHTMLTableToExcel from "react-html-table-to-excel";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import { useExamTemplateGet } from "@/hooks/use-exam-template";
import ActionsPopupExamTemplate from "@/components/exam-template/data-table-row-action";
import { examTemplateDelete } from "@/services/exam-template-service";

const headers = [
  { label: "ID", value: "id" },
  { label: "Date", value: "date" },
  { label: "Subject", value: "subject" },
  { label: "Standard", value: "standard" },
  { label: "Total Mark", value: "total_marks" },
  { label: "Note", value: "note" },
];

function ExamTemplatePage() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [examId, setExamId] = useState();

  const componentPDF = useRef();

  const { data, isLoading, refetch } = useExamTemplateGet();

  const students = data?.data;
  const startIndex = page * pageSize;
  const endIndex = (page + 1) * pageSize;

  const handlePageSizeChange = (value) => {
    setPageSize(parseInt(value));
    setPage(0);
  };

  const mutation = useMutation({
    mutationFn: (examId) => examTemplateDelete(examId),
    onSuccess: () => {
      refetch();
      setOpenAlert(false);
      toast.success("Exam Template Delete Successfully");
    },
  });

  const openAlertDeleteBox = (id) => {
    setExamId(id);
    setOpenAlert(true);
  };

  const handleDeleteStudent = () => {
    mutation.mutate(examId);
  };

  const filteredStudents = students?.filter((exam) => {
    return search.toLocaleLowerCase() === ""
      ? exam
      : exam.date.toLocaleLowerCase().includes(search) ||
          exam.subject.toLocaleLowerCase().includes(search) ||
          exam.standard.toLocaleLowerCase().includes(search);
  });

  const visibleStudents = filteredStudents?.slice(startIndex, endIndex);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Exam Template Marks",
    onAfterPrint: () => alert("PDF generated successfully"),
  });

  const [uploaddata, setUploaddata] = useState([]);
  const [fileLoader, setFileLoader] = useState(true);

  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleFileUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet, { raw: true });

        const formattedData = parsedData.map((row) => {
          if (row.Date) {
            const dateCode = parseFloat(row.Date);
            if (!isNaN(dateCode)) {
              const date = XLSX.SSF.parse_date_code(dateCode);
              row.Date = new Date(
                date.y,
                date.m - 1,
                date.d
              ).toLocaleDateString("en-GB");
            }
          }
          row.Date = format(row.Date, "yyyy-MM-dd");
          return row;
        });

        setUploaddata(formattedData);
        setFileLoader(false);
        // toast.success("File Upload Successfully");
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
        setFile(null);
      };
      reader.onerror = (error) => {
        toast.error("Failed to read file: " + error);
        setFileLoader(true);
      };
    } else {
      setFileLoader(true);
      toast.error("Please select a file first");
    }
  };
  const uploadFilemutation = useMutation({
    mutationFn: (uploaddata) => UploadFileExamAdd(uploaddata),
    onSuccess: (res) => {
      refetch();
      toast.success(res.data.message);
    },
    onError: (error) => {
      toast.error(`Failed To Upload File: ${error.errors}`);
    },
  });

  useEffect(() => {
    if (!fileLoader) {
      uploadFilemutation.mutate(uploaddata);
    }
  }, [uploaddata, fileLoader]);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
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
              onClick={() => handleDeleteStudent(examId)}
              className="bg-[red] text-white hover:bg-red-500"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <h1>EXAM TEMPLATE</h1>
      <div className="block md:flex md:justify-between gap-2">
        <div className="w-full">
          <Input
            className="w-full md:max-w-sm mb-2 md:mb-0 md:mr-2"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 md:m-0 mt-4">
          <Link to="/exam-template/add">
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
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              table="print-excel"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Download as XLS"
            />
          )}
        </div>
      </div>
      <ScrollArea className="rounded-md border w-full h-[calc(80vh-120px)]">
        <div ref={componentPDF} style={{ width: "100%" }}>
          <h1 className="hidden title-table">
            THINKERS MARKS SHEET / 2005-02-02
          </h1>
          <Table className="relative" id="print-excel">
            <TableHeader>
              <TableRow>
                {headers.map((header, index) => (
                  <TableHead key={index}>{header.label}</TableHead>
                ))}
                <TableHead className="no-print bg-[#151518]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!students || filteredStudents.length === 0 ? (
                <TableRow className="text-center align-middle">
                  <TableCell
                    colSpan={headers.length + 1}
                    className="uppercase text-lg"
                  >
                    No Data Found
                  </TableCell>
                </TableRow>
              ) : (
                visibleStudents.map((exam) => (
                  <TableRow key={exam.id}>
                    {headers.map((header) => (
                      <TableCell key={header.value} className="capitalize">
                        {header.value === "standard"
                          ? exam[header.value] === "13"
                            ? "Balvatika"
                            : exam[header.value] || "None"
                          : exam[header.value] || "None"}
                      </TableCell>
                    ))}
                    <TableCell className="no-print sticky top-0 right-0 z-[1] bg-[#151518]">
                      <ActionsPopupExamTemplate
                        id={exam.id}
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

export default ExamTemplatePage;