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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useExamTemplateGet } from "@/hooks/use-exam-template";
import ActionsPopupExamTemplate from "@/components/exam-template/data-table-row-action";
import { examTemplateDelete } from "@/services/exam-template-service";
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
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { BreadcrumbComponent } from "@/components/Breadcrumb";

const headers = [
  { label: "ID", value: "id" },
  { label: "Date", value: "date" },
  { label: "Subject", value: "subject" },
  { label: "Standard", value: "standard" },
  { label: "Total Mark", value: "total_marks" },
  { label: "Note", value: "note" },
];

function ExamTemplatePage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [examId, setExamId] = useState();

  const componentPDF = useRef();

  const { data, isLoading, refetch } = useExamTemplateGet();

  const exams = data?.data || [];

  const filteredExams = exams.filter((exam) => {
    return search.toLowerCase() === ""
      ? exam
      : exam.date.toLowerCase().includes(search) ||
          exam.subject.toLowerCase().includes(search) ||
          exam.standard.toLowerCase().includes(search);
  });

  const totalPages = Math.ceil(filteredExams.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleExams = filteredExams.slice(startIndex, endIndex);

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

  const handleDeleteExam = () => {
    mutation.mutate(examId);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(parseInt(newSize));
    setPage(1);
  };

  if (isLoading) {
    return <Spinner />;
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
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete and remove your data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteExam}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* PAth */}
      <BreadcrumbComponent customItems={[{ label: "Test" }]} />
      {/* PAth */}

      <h1 className="uppercase mb-4 text-2xl font-bold">TEST</h1>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <Input
            className="w-full sm:w-64"
            placeholder="Search By Exam"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link to="/exam-template/add">
            <Button>Add Exam Template</Button>
          </Link>
        </div>

        <ScrollArea className="h-[calc(100vh-250px)] rounded-md border">
          <Table>
            <TableHeader className="z-50 sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <TableRow className="bg-muted/50">
                {headers.map((header) => (
                  <TableHead key={header.value} className="whitespace-nowrap">
                    {header.label}
                  </TableHead>
                ))}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleExams.map((exam) => (
                <TableRow key={exam.id}>
                  {headers.map((header) => (
                    <TableCell
                      key={`${exam.id}-${header.value}`}
                      className="capitalize whitespace-nowrap"
                    >
                      {header.value === "standard"
                        ? exam[header.value] === "13"
                          ? "Balvatika"
                          : exam[header.value] || "None"
                        : exam[header.value] || "None"}
                    </TableCell>
                  ))}
                  <TableCell className="">
                    <ActionsPopupExamTemplate
                      id={exam.id}
                      standard={exam.standard}
                      openAlertDeleteBox={openAlertDeleteBox}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
          <div className="whitespace-nowrap text-sm dark:text-white text-black font-medium order-2 md:order-1">
            {filteredExams?.length > 0
              ? `Showing ${Math.min(
                  (page - 1) * pageSize + 1,
                  filteredExams.length
                )} - ${Math.min(page * pageSize, filteredExams.length)} of ${
                  filteredExams.length
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
                  filteredExams.length === 0
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
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, page + 1))
                  }
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
      </div>
    </>
  );
}

export default ExamTemplatePage;
