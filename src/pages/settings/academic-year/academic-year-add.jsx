import React from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AcademicYearFormPage from "./academic-year-form";
import { postAcademicYear } from "@/services/academic-year-service";
import { BreadcrumbComponent } from "@/components/Breadcrumb";

const AcademicYearAddPage = () => {
  const defaultValues = {
    name: "",
    is_current: true,
  };

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data) => postAcademicYear(data),
    onSuccess: () => {
      navigate("/setting/academic-year");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      {/* PAth */}
      <BreadcrumbComponent
        customItems={[
          { label: "Settings", path: "/setting" },
          { label: "Academic year", path: "/setting/academic-year" },
          { label: "Add Academic year" },
        ]}
      />
      {/* PAth */}
      <h1 className="uppercase text-2xl font-bold mb-4">ADD ACADEMIC YEAR</h1>
      <Card>
        <AcademicYearFormPage
          defaultValues={defaultValues}
          onSubmit={onSubmit}
        />
      </Card>
    </>
  );
};

export default AcademicYearAddPage;
