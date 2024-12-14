import React from "react";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Spinner from "@/components/spinner/spinner";
import StandardMasterForm from "./standard-master-form-page";
import { updateStandardMaster } from "@/services/standard-master-service";
import { useStandardMasterGet } from "@/hooks/use-standard-master";
import toast, { Toaster } from "react-hot-toast";
import { BreadcrumbComponent } from "@/components/Breadcrumb";
const StandardMasterUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading, error, refetch } = useStandardMasterGet(id);

  const standardMasterData = data || {};
  console.log(standardMasterData);

  const defaultValues = {
    name: standardMasterData?.name || "",
    is_active: standardMasterData?.is_active || false,
    school_type: standardMasterData?.school_type || "",
  };

  const mutation = useMutation({
    mutationFn: (data) => updateStandardMaster(data, id),
    onSuccess: () => {
      refetch();
      toast.success("Standard Update Successfully");
      setTimeout(() => {
        navigate("/setting/standard-master");
      }, 1000); // Add a small delay before navigation
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
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      {/* PAth */}
      <BreadcrumbComponent
        customItems={[
          { label: "Settings", path: "/setting" },
          { label: "Standard master", path: "/setting/standard-master" },
          { label: "Edit Standard master" },
        ]}
      />
      {/* PAth */}
      <h1 className="uppercase text-2xl font-bold mb-4">
        Edit STANDARD MASTER
      </h1>
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
