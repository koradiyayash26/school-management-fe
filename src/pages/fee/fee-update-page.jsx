import React from "react";

import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { useFeeTypeList, useFeetypeGetdata } from "@/hooks/use-fees";
import FeeTypeForm from "@/components/fee/fee-type-form";
import { useMutation } from "@tanstack/react-query";
import { feeTypeUpdate } from "@/services/fees-service";

const FeetypeUpdatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useFeetypeGetdata(id);

  const feetypeData = data?.data;
  const defaultValues = {
    year: feetypeData?.year || "",
    fee_master: feetypeData?.fee_master?.name || "",
    standard: String(feetypeData?.standard) || "",
    amount: feetypeData?.amount || "",
  };

  const {
    data: feeTypeList,
    isLoading: feeTyoeLoading,
    error: feeTypeErro,
    refetch: feeTypeRefetch,
  } = useFeeTypeList();

  let feeMaster = feeTypeList?.data?.fee_master;
  let standard = feeTypeList?.data?.standard;

  const mutation = useMutation({
    mutationFn: (formattedData) => feeTypeUpdate(formattedData, id),
    onSuccess: () => {
      refetch();
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

  if (isLoading || feeTyoeLoading) {
    return <>Loading</>;
  }
  if (error || feeTypeErro) {
    return <>Error</>;
  }

  return (
    <>
      <h1>UPDATE FEE TYPE</h1>
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

export default FeetypeUpdatePage;
