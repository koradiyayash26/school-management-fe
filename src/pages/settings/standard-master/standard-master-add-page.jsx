import React from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import StandardMasterForm from "./standard-master-form-page";
import { postStandardMaster } from "@/services/standard-master-service";

const StandardMasterAdd = () => {
  const defaultValues = {
    name: "",
    is_active: true,
  };

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data) => postStandardMaster(data),
    onSuccess: () => {
      navigate("/setting/standard-master");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <h1>ADD STANDARD MASTER</h1>
      <Card className="">
        <StandardMasterForm defaultValues={defaultValues} onSubmit={onSubmit} />
      </Card>
    </>
  );
};

export default StandardMasterAdd;
