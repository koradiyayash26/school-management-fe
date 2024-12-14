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
import { BreadcrumbComponent } from "@/components/Breadcrumb";

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
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <>
      {/* PAth */}
      <BreadcrumbComponent
        customItems={[
          { label: "Test", path: "/exam-template" },
          { label: "Add Test template" },
        ]}
      />
      {/* PAth */}
      <Card className="">
        <CardHeader>
          <CardTitle>TEST TEMPLATE</CardTitle>
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
