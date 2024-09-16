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
      <Toaster position="top-center" reverseOrder={false} />
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

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">EXAM TEMPLATE</h1>
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <Input
            className="w-full sm:w-64"
            placeholder="Search exams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link to="/exam-template/add">
            <Button>Add Exam Template</Button>
          </Link>
        </div>

        <ScrollArea className="h-[calc(100vh-250px)] rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {headers.map((header) => (
                  <TableHead key={header.value}>{header.label}</TableHead>
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
                  <TableCell className="sticky right-0">
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

        <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-between space-y-0 md:space-y-0 md:space-x-2">
          <div className="text-sm dark:text-white text-black font-medium order-2 md:order-1">
            {filteredExams?.length > 0
              ? `Showing ${Math.min(
                  (page - 1) * pageSize + 1,
                  filteredExams.length
                )} - ${Math.min(page * pageSize, filteredExams.length)} of ${
                  filteredExams.length
                }.`
              : "No entries to show"}
          </div>
          <div className="flex items-center space-x-2 order-1 md:order-2">
            <p className="text-sm font-medium hidden md:hidden lg:inline sm:inline ">
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
          {totalPages > 1 && (
            <div className="order-3 w-full md:w-auto">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(Math.max(1, page - 1))}
                      disabled={page === 1}
                    />
                  </PaginationItem>
                  <div className="flex md:hidden items-center">
                    <PaginationItem>
                      <PaginationLink isActive>{page}</PaginationLink>
                    </PaginationItem>
                  </div>
                  <div className="hidden md:flex space-x-1 items-center">
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => handlePageChange(1)}
                        isActive={page === 1}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    {page > 3 && <PaginationEllipsis />}
                    {page > 2 && (
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => handlePageChange(page - 1)}
                        >
                          {page - 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    {page !== 1 && page !== totalPages && (
                      <PaginationItem>
                        <PaginationLink isActive>{page}</PaginationLink>
                      </PaginationItem>
                    )}
                    {page < totalPages - 1 && (
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => handlePageChange(page + 1)}
                        >
                          {page + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    {page < totalPages - 2 && <PaginationEllipsis />}
                    {totalPages > 1 && (
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => handlePageChange(totalPages)}
                          isActive={page === totalPages}
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                  </div>
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
          )}
        </div>
      </div>
    </>
  );
}

export default ExamTemplatePage;
