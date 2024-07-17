import React, { useEffect, useState } from "react";
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
import { useExamTemplateGetStudents } from "@/hooks/use-exam-template";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { examTemplateStudentMarkAssingPost } from "@/services/exam-template-service";

const headers = [
  { label: "ID", value: "id" },
  { label: "First Name", value: "first_name" },
  { label: "Middle Name", value: "middle_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
];

function ExamAssingMarkPage() {
  const navigate = useNavigate();

  const { id, std } = useParams();
  const { data, isLoading, error } = useExamTemplateGetStudents(id, std);

  let students = data?.data?.students || [];
  let examDetail = data?.data?.exam_template;

  const [marks, setMarks] = useState({});

  useEffect(() => {
    if (students.length > 0) {
      const initialMarks = {};
      students.forEach((student) => {
        initialMarks[student.id] = 0;
      });
      setMarks(initialMarks);
    }
  }, [students]);

  const handleInputChange = (e, studentId) => {
    const value =
      e.target.value === ""
        ? ""
        : Math.max(
            0,
            Math.min(examDetail.total_marks, parseInt(e.target.value))
          );
    setMarks((prevMarks) => ({
      ...prevMarks,
      [studentId]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: (formattedMarks) =>
      examTemplateStudentMarkAssingPost(
        examDetail.id,
        examDetail.standard,
        formattedMarks
      ),
    onSuccess: () => {
      navigate("/exam-template");
      setTimeout(() => {
        toast.success("Marks Assigned Successfully");
      }, 500);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(marks);
    const formattedMarks = { marks };
    mutation.mutate(formattedMarks);
    console.log("done");
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
      <h1>EXAM MARKS ASSING</h1>
      <div className="grid gap-2 md:gap-0 text-[14px]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center md:gap-2">
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
          <div>
            <Button onClick={handleSubmit} className="w-auto">
              Assing Marks
            </Button>
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
                      <Input
                        className="w-auto"
                        type="number"
                        value={
                          marks[student.id] === undefined
                            ? ""
                            : marks[student.id]
                        }
                        onChange={(e) => handleInputChange(e, student.id)}
                        min="0"
                        max={examDetail.total_marks}
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
    </>
  );
}

export default ExamAssingMarkPage;
