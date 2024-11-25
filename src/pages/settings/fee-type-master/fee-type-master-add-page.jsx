import React from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import FeeTypeMasterFormPage from "./fee-type-master-form-page";
import { postFeeTypeMaster } from "@/services/fee-type-master";

const FeeTypeMasterAddPage = () => {
  const defaultValues = {
    name: "",
    is_active: true,
  };

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data) => postFeeTypeMaster(data),
    onSuccess: () => {
      navigate("/setting/fee-type-master");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <h1 className="uppercase text-2xl font-bold mb-4">ADD FEE TYPE MASTER</h1>
      <Card className="">
        <FeeTypeMasterFormPage defaultValues={defaultValues} onSubmit={onSubmit}/>
      </Card>
    </>
  );
};

export default FeeTypeMasterAddPage;
