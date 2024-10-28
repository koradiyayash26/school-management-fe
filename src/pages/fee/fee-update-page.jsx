import React from "react";

import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { useFeeTypeList, useFeetypeGetdata } from "@/hooks/use-fees";
import FeeTypeForm from "@/components/fee/fee-type-form";
import { useMutation } from "@tanstack/react-query";
import { feeTypeUpdate } from "@/services/fees-service";
import Spinner from "@/components/spinner/spinner";
import { useAcademicYear } from "@/hooks/use-academic-year";

const FeetypeUpdatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useFeetypeGetdata(id);

  const {
    data: academicData,
    isLoading: academicLoading,
    error: academicError,
    refetch: academicRefetch,
  } = useAcademicYear();
  const academicYear = academicData || [];

  const feetypeData = data?.data;
  
  let academicDefault = null;
  academicYear.forEach((year) => {
    if (year.id === feetypeData?.year) {
      academicDefault = year.year;      
    }
  });
  const defaultValues = {
    year: academicDefault || "",
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
      academicRefetch();
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
      year: academicYearId,
      fee_master: feeId,
    };
    mutation.mutate(formattedData);
  };

  if (isLoading || feeTyoeLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }
  if (error || feeTypeErro) {
    return <>Error</>;
  }

  return (
    <>
      <Card className="">
        <FeeTypeForm
          academicYear={academicYear}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          id={id}
          isLoadin={isLoading}
          feeMaster={feeMaster}
          standard={standard}
        />
      </Card>
    </>
  );
};

export default FeetypeUpdatePage;
