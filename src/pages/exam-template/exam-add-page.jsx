import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ExamTemplateForm from "@/components/exam-template/exam-template-from";
import { examTemplateIdAdd } from "@/services/exam-template-service";
import Spinner from "@/components/spinner/spinner";

const ExamTemplateAddPage = () => {
  const defaultValues = {
    total_marks: "",
    standard: "",
    subject: "",
    note: "",
    date: "",
  };

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (formattedData) => examTemplateIdAdd(formattedData),
    onSuccess: () => {
      navigate("/exam-template");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
    console.log(data);
  };
  var isLoading = false;

  if (isLoading) {
    return <><Spinner/></>;
  }

  return (
    <>
      <h1>EXAM TEMPLATE</h1>
      <Card className="">
        <CardHeader>
          <CardTitle>EXAM TEMPLATE</CardTitle>
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

export default ExamTemplateAddPage;
