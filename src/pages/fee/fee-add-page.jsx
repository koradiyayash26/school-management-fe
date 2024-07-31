import React from "react";

import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import FeeTypeForm from "@/components/fee/fee-type-form";
import { useFeeTypeList } from "@/hooks/use-fees";
import { useMutation } from "@tanstack/react-query";
import { FeeTypeadd } from "@/services/fees-service";

const FeeTypesAddPage = () => {
  const defaultValues = {
    year: "",
    fee_master: "",
    standard: "",
    amount: "",
  };

  const navigate = useNavigate();
  const { data, isLoading, refetch } = useFeeTypeList();

  let feeMaster = data?.data?.fee_master;
  let standard = data?.data?.standard;

  const mutation = useMutation({
    mutationFn: (formattedData) => FeeTypeadd(formattedData),
    onSuccess: () => {
      navigate("/fee-type");
    },
  });

  const onSubmit = (data) => {
    let feeId;
    feeMaster.forEach((element) => {
      if (element.name === data.fee_master) {
        feeId = element.id;
      }
    });
    const formattedData = {
      ...data,
      fee_master: feeId,
    };
    mutation.mutate(formattedData);
  };

  if (isLoading) {
    return <>loading....</>;
  }

  return (
    <>
      <h1>ADD FEE TYPE</h1>
      <Card className="">
        <FeeTypeForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          isLoadin={isLoading}
          feeMaster={feeMaster}
          standard={standard}
        />
      </Card>
    </>
  );
};

export default FeeTypesAddPage;
