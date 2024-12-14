import React from "react";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Spinner from "@/components/spinner/spinner";
import FeeTypeMasterFormPage from "./fee-type-master-form-page";
import { updateFeeTypeMaster } from "@/services/fee-type-master";
import { useFeeTypeMasterGet } from "@/hooks/use-fee-type-master";
import { BreadcrumbComponent } from "@/components/Breadcrumb";
const FeeTypeMasterUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading, error, refetch } = useFeeTypeMasterGet(id);

  const standardMasterData = data || {};
  console.log(standardMasterData);

  const defaultValues = {
    name: standardMasterData?.name || "",
    is_active: standardMasterData?.is_active || false,
  };

  const mutation = useMutation({
    mutationFn: (data) => updateFeeTypeMaster(data, id),
    onSuccess: () => {
      refetch();
      navigate("/setting/fee-type-master");
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
      {/* PAth */}
      <BreadcrumbComponent
        customItems={[
          { label: "Settings", path: "/setting" },
          { label: "Fee type master", path: "/setting/fee-type-master" },
          { label: "Edit Fee type master" },
        ]}
      />
      {/* PAth */}
      <h1 className="uppercase text-2xl font-bold mb-4">
        EDIT FEE TYPE MASTER
      </h1>
      <Card className="">
        <FeeTypeMasterFormPage
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          isLoadin={isLoading}
        />
      </Card>
    </>
  );
};

export default FeeTypeMasterUpdate;
