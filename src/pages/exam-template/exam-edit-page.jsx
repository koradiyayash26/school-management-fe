import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import ExamTemplateForm from "@/components/exam-template/exam-template-from";
import { useExamTemplateIdGet } from "@/hooks/use-exam-template";
import { examTemplateIdUpdate } from "@/services/exam-template-service";
import Spinner from "@/components/spinner/spinner";

const ExamTemplateEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: data, isLoading, refetch } = useExamTemplateIdGet(id);

  let examGetData = data?.data;

  const defaultValues = {
    total_marks: examGetData?.total_marks,
    subject: examGetData?.subject,
    standard: examGetData?.standard,
    date: examGetData?.date,
    note: examGetData?.note,
  };

  const mutation = useMutation({
    mutationFn: (data) => examTemplateIdUpdate(data, id),
    onSuccess: () => {
      refetch();
      navigate("/exam-template");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <>
      <Card className="">
        <CardHeader>
          <CardTitle>UPDATE EXAM MARKS</CardTitle>
          <CardDescription>
            All Fields Are Required in This Form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <ExamTemplateForm
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              loading={isLoading}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ExamTemplateEditPage;
