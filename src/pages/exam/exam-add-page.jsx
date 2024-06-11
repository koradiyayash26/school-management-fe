import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import ExamForm from "@/components/exam/exam-form";
import { useMutation } from "@tanstack/react-query";
import { addExam } from "@/services/exam-service";
import { useExam } from "@/hooks/use-exam";

const ExamMarksAddPage = () => {
  const defaultValues = {
    student: "",
    total_marks: "",
    marks: "",
    std: "",
    sub: "",
    date: "",
  };

  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useExam();

  let studentName = data?.data;
  const mutation = useMutation({
    mutationFn: (formattedData) => addExam(formattedData),
    onSuccess: () => {
      navigate("/exam");
    },
  });

  const onSubmit = (data) => {
    const selectedStudent = studentName.find(
      (student) =>
        `${student.id} ${student.first_name} ${student.last_name}` ===
        data.student
    );
    if (selectedStudent) {
      data.student = selectedStudent.id;
    }
    mutation.mutate(data);
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <h1>ADD EXAM MARKS</h1>
      <Card className="">
        <CardHeader>
          <CardTitle>ADD EXAM MARKS</CardTitle>
          <CardDescription>
            All Fields Are Required in This Form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <ExamForm
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              studentName={studentName}
              loading={isLoading}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ExamMarksAddPage;
