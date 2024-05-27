import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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

const deleteExamMarks = async (feeTypeId) => {
  const token = localStorage.getItem("Token");

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  const res = await axios.delete(
    `http://127.0.0.1:8000/exams/${feeTypeId}/delete/`,
    config
  );
  return res.data;
};

const getExamMarksData = async () => {
  const token = localStorage.getItem("Token");

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  const res = await axios.get("http://127.0.0.1:8000/exams/search/", config);
  return res.data;
};

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
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [feeTypeId, setFeeTypeId] = useState();

  const { data, isLoading } = useQuery({
    queryKey: ["exammarks"],
    queryFn: getExamMarksData,
  });

  const students = data?.data;
  const startIndex = page * pageSize;
  const endIndex = (page + 1) * pageSize;

  const visibleStudents = students?.slice(startIndex, endIndex);

  const handlePageSizeChange = (value) => {
    setPageSize(parseInt(value));
    setPage(0);
  };

  const mutation = useMutation({
    mutationFn: deleteExamMarks,
    onSuccess: () => {
      queryClient.invalidateQueries("exammarks");
      setOpenAlert(false);
      toast.success("ExamMarks Delete Successfully");
    },
  });

  const openAlertDeleteBox = (id) => {
    setFeeTypeId(id);
    setOpenAlert(true);
  };
  const handleDeleteStudent = () => {
    mutation.mutate(feeTypeId);
  };

  if (isLoading) {
    return <>Loading...</>;
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
              onClick={() => handleDeleteStudent(feeTypeId)}
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
          className="w-full md:max-w-sm mb-2 md:mb-0  md:mr-2"
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
      <div>
        <Link to="/exam/add">
          <Button>Add</Button>
        </Link>
      </div>
      <ScrollArea className="rounded-md border max-w-[1280px] h-[calc(80vh-120px)]">
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
              .filter((exam) => {
                return search.toLocaleLowerCase() === ""
                  ? exam
                  : exam.date.toLocaleLowerCase().includes(search) ||
                      exam.sub.toLocaleLowerCase().includes(search) ||
                      exam.std.toLocaleLowerCase().includes(search) ||
                      exam.marks.toLocaleLowerCase().includes(search);
              })
              .map((exam) => (
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
                  <TableCell className="">
                    <ActionsPopupExamMark
                      id={exam.id}
                      openAlertDeleteBox={openAlertDeleteBox}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
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
