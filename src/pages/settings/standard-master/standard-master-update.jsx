import React from "react";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Spinner from "@/components/spinner/spinner";
import StandardMasterForm from "./standard-master-form";
import { updateStandardMaster } from "@/services/standard-master-service";
import { useStandardMasterGet } from "@/hooks/use-standard-master";
const StandardMasterUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading, error, refetch } = useStandardMasterGet(id);

  const standardMasterData = data || {};
  console.log(standardMasterData);

  const defaultValues = {
    name: standardMasterData?.name || "",
    is_active: standardMasterData?.is_active || "",
  };

  const mutation = useMutation({
    mutationFn: (data) => updateStandardMaster(data, id),
    onSuccess: () => {
      refetch();
      navigate("/setting/standard-master");
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
      <h1>UPDATE STANDARD MASTER</h1>
      <Card className="">
        <StandardMasterForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          isLoadin={isLoading}
        />
      </Card>
    </>
  );
};

export default StandardMasterUpdate;
