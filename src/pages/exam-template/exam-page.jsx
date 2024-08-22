import React, { useRef, useState } from "react";
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
import { useExamTemplateGet } from "@/hooks/use-exam-template";
import ActionsPopupExamTemplate from "@/components/exam-template/data-table-row-action";
import { examTemplateDelete } from "@/services/exam-template-service";
import Spinner from "@/components/spinner/spinner";

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

  if (isLoading) {
    return <><Spinner/></>;
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
                        standard={exam.standard}
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
