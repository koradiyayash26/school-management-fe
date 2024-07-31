import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toast, { Toaster } from "react-hot-toast";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useExamTemplateGetStudentsForPatch } from "@/hooks/use-exam-template";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { examAssingMarkUpdatePatch } from "@/services/exam-template-service";
import { useMutation } from "@tanstack/react-query";

const headers = [
  { label: "Id", value: "ids" },
  { label: "First Name", value: "first_name" },
  { label: "Middle Name", value: "middle_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
];

function ExamAssingMarkEditPage() {
  const { id, std } = useParams();
  const [editableRow, setEditableRow] = useState(null);
  const [marks, setMarks] = useState({});

  const { data, isLoading, refetch, error } =
    useExamTemplateGetStudentsForPatch(id, std);

  let students = data?.data?.exam_marks || [];
  let examDetail = data?.data?.exam_template;

  const handleInputChange = (e, studentId) => {
    const value = e.target.value
      ? Math.max(
          0,
          Math.min(
            data?.data?.exam_template.total_marks,
            parseInt(e.target.value)
          )
        )
      : 0;
    setMarks({
      ...marks,
      [studentId]: value,
    });
  };

  const mutation = useMutation({
    mutationFn: (updatedMark) => examAssingMarkUpdatePatch(updatedMark),
    onSuccess: () => {
      refetch();
      setEditableRow(null);
      toast.success("Marks Assing SuccessFully");
    },
  });

  const handleUpdateClick = (student) => {
    if (editableRow === student.id) {
      mutation.mutate({
        exam_template_id: parseInt(id),
        standard: parseInt(std),
        mark_id: student.student,
        new_mark_value: marks[student.id],
      });
      console.log({
        exam_template_id: id,
        standard: std,
        mark_id: student.id,
        new_mark_value: marks[student.id],
      });
    } else {
      setEditableRow(student.id);
      setMarks({
        ...marks,
        [student.id]: student.mark,
      });
    }
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error</>;
  }

  return (
    <>
      {" "}
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
      <h1>EXAM MARKS LIST</h1>
      <div className="grid gap-2 md:gap-0 text-[14px]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center md:gap-2">
          <div>
            <span className="text-gray-500 text-[14px] uppercase">
              Standard :{" "}
            </span>
            {examDetail.standard === "13" ? "Balvatika" : examDetail.standard}
          </div>
          <div>
            <span className="text-gray-500 text-[14px] uppercase">
              Total Marks :{" "}
            </span>
            {examDetail.total_marks}
          </div>
          <div>
            <span className="text-gray-500 text-[14px] uppercase">
              Subject :{" "}
            </span>
            {examDetail.subject}
          </div>
          <div>
            <span className="text-gray-500 text-[14px] uppercase">Date : </span>
            {examDetail.date}
          </div>
          <div>
            <span className="text-gray-500 text-[14px] uppercase">Note : </span>
            {examDetail.note}
          </div>
        </div>
      </div>
      <ScrollArea className="rounded-md border w-full h-[calc(80vh-120px)]">
        <div>
          <Table className="relative" id="print-excel">
            <TableHeader>
              <TableRow>
                {headers.map((header, index) => (
                  <TableHead key={index}>{header.label}</TableHead>
                ))}
                <TableHead className="no-print bg-[#151518]">Marks</TableHead>
                <TableHead className="no-print bg-[#151518]">Update</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={headers.length + 1}
                    className="text-center"
                  >
                    No Data
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student) => (
                  <TableRow key={student.id}>
                    {headers.map((header) => (
                      <TableCell key={header.value} className="capitalize">
                        {student[header.value] || "None"}
                      </TableCell>
                    ))}
                    <TableCell>
                      {editableRow === student.id ? (
                        <Input
                          className="w-auto"
                          type="number"
                          value={marks[student.id] || 0}
                          onChange={(e) => handleInputChange(e, student.id)}
                          min="0"
                          max={examDetail.total_marks}
                        />
                      ) : (
                        <div>{student.mark}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleUpdateClick(student)}>
                        {editableRow === student.id ? "Save" : "Update"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}

export default ExamAssingMarkEditPage;
