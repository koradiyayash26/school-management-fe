import React from "react";

import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import FeeTypeForm from "@/components/fee/fee-type-form";
import { useFeeTypeList } from "@/hooks/use-fees";
import { useMutation } from "@tanstack/react-query";
import { FeeTypeadd } from "@/services/fees-service";
import Spinner from "@/components/spinner/spinner";
import { useAcademicYear } from "@/hooks/use-academic-year";

const FeeTypesAddPage = () => {
  const defaultValues = {
    year: "",
    fee_master: "",
    standard: "",
    amount: "",
  };

  const navigate = useNavigate();
  const { data, isLoading, refetch } = useFeeTypeList();

  const {
    data: academicData,
    isLoading: academicLoading,
    error: academicError,
    refetch: academicRefetch,
  } = useAcademicYear();
  const academicYear = academicData || [];

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
    let academicYearId = null;
    academicYear.forEach((year) => {
      if (year.year === data.year) {
        academicYearId = year.id;
      }
    });
    const formattedData = {
      ...data,
      year: academicYearId, // Send the matched ID
      fee_master: feeId,
    };
    mutation.mutate(formattedData);
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
        <FeeTypeForm
          academicYear={academicYear}
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
