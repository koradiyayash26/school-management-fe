import React, { useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
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
import ActionsPopupExamMark from "@/components/exam/data-table-row-action";
import { useExamList } from "@/hooks/use-exam";
import { deleteExam } from "@/services/exam-service";
import { useReactToPrint } from "react-to-print";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import ReactHTMLTableToExcel from "react-html-table-to-excel";

const headers = [
  { label: "ID", value: "id" },
  { label: "Student", value: "student" },
  { label: "Date", value: "date" },
  { label: "Subject", value: "sub" },
  { label: "Standard", value: "std" },
  { label: "Total Mark", value: "total_marks" },
  { label: "Mark", value: "marks" },
];

function ExamMarksPage() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [examId, setExamId] = useState();

  const componentPDF = useRef();

  const { data, isLoading, refetch } = useExamList();

  const students = data?.data;
  const startIndex = page * pageSize;
  const endIndex = (page + 1) * pageSize;

  const handlePageSizeChange = (value) => {
    setPageSize(parseInt(value));
    setPage(0);
  };

  const mutation = useMutation({
    mutationFn: (examId) => deleteExam(examId),
    onSuccess: () => {
      refetch();
      setOpenAlert(false);
      toast.success("Exam Delete Successfully");
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
          exam.sub.toLocaleLowerCase().includes(search) ||
          exam.std.toLocaleLowerCase().includes(search) ||
          exam.marks.toLocaleLowerCase().includes(search);
  });

  const visibleStudents = filteredStudents?.slice(startIndex, endIndex);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Exam Marks",
    onAfterPrint: () => alert("PDF generated successfully"),
  });

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
      <h1>EXAM MARKS</h1>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <Input
          className="w-full md:max-w-sm mb-2 md:mb-0 md:mr-2"
          placeholder="Search"
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
      <div className="flex gap-2">
        <Link to="/exam/add">
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
                <p>Not Print Empty Data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button>
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button"
              table="print-excel"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Download as XLS"
            />
          </Button>
        )}
      </div>
      <ScrollArea className="rounded-md border max-w-[1280px] h-[calc(80vh-120px)]">
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
                <TableHead className="no-print">Actions</TableHead>
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
                visibleStudents.map((exam) => (
                  <TableRow key={exam.id}>
                    {headers.map((header) => (
                      <TableCell key={header.value} className="capitalize">
                        {header.value === "student"
                          ? (exam.student?.first_name || "None") +
                            " " +
                            (exam.student?.last_name || "None")
                          : header.value === "std"
                          ? exam[header.value] === "13"
                            ? "Balvatika"
                            : exam[header.value] || "None"
                          : exam[header.value] || "None"}
                      </TableCell>
                    ))}
                    <TableCell className="no-print">
                      <ActionsPopupExamMark
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
    </>
  );
}

export default ExamMarksPage;
