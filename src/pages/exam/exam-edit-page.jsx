import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useExam, useGetExam } from "@/hooks/use-exam";
import { updateExam } from "@/services/exam-service";
import { useMutation } from "@tanstack/react-query";
import ExamForm from "@/components/exam/exam-form";

const ExamMarksEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: studentData, isLoading, refetch } = useExam();
  let studentName = studentData?.data;
  const {
    data: data,
    isLoading: examLoading,
    refetch: examRefetch,
  } = useGetExam(id);

  let examGetData = data?.data;
// if any of problem on seletd student name then remove only ids on all add,edit,form of exam then fix it
  const defaultValues = {
    student: `${examGetData?.student?.id} ${examGetData?.student?.first_name} ${examGetData?.student?.last_name}`,
    total_marks: examGetData?.total_marks,
    sub: examGetData?.sub,
    std: examGetData?.std,
    marks: examGetData?.marks,
    date: examGetData?.date,
  };

  const mutation = useMutation({
    mutationFn: (data) => updateExam(data, id),
    onSuccess: () => {
      refetch();
      examRefetch();
      navigate("/exam");
    },
  });

  const onSubmit = (data) => {
    const selectedStudent = studentName.find(
      (student) => `${student.id} ${student.first_name} ${student.last_name}` === data.student
    );
    if (selectedStudent) {
      data.student = selectedStudent.id;
    }
    mutation.mutate(data);
  };

  if (isLoading || examLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <h1>UPDATE EXAM MARKS</h1>
      <Card className="">
        <CardHeader>
          <CardTitle>UPDATE EXAM MARKS</CardTitle>
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

export default ExamMarksEditPage;
