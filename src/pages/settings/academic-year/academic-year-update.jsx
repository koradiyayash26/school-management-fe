import React from "react";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Spinner from "@/components/spinner/spinner";
import AcademicYearFormPage from "./academic-year-form";
import { useAcademicYearGetData } from "@/hooks/use-academic-year";
import { updateAcademicYear } from "@/services/academic-year-service";
const AcademicYearUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading, error, refetch } = useAcademicYearGetData(id);

  const year = data || {};

  const defaultValues = {
    year: year?.year || "",
    is_current: year?.is_current || false,
  };

  const mutation = useMutation({
    mutationFn: (data) => updateAcademicYear(data, id),
    onSuccess: () => {
      refetch();
      navigate("/setting/academic-year");
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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <h1 className="uppercase text-2xl font-bold mb-4">
        UPDATE ACADEMIC YEAR
      </h1>
      <Card className="">
        <AcademicYearFormPage
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          isLoadin={isLoading}
        />
      </Card>
    </>
  );
};

export default AcademicYearUpdate;
