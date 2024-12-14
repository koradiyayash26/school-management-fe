import React from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import StandardMasterForm from "./standard-master-form-page";
import { postStandardMaster } from "@/services/standard-master-service";
import toast, { Toaster } from "react-hot-toast";
import { BreadcrumbComponent } from "@/components/Breadcrumb";

const StandardMasterAdd = () => {
  const defaultValues = {
    name: "",
    is_active: true,
  };

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data) => postStandardMaster(data),
    onSuccess: () => {
      toast.success("Standard Add Successfully");
      setTimeout(() => {
        navigate("/setting/standard-master");
      }, 1000); // Add a small delay before navigation
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

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
          duration: 5000,
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
          { label: "Add Standard master" },
        ]}
      />
      {/* PAth */}
      <h1 className="uppercase text-2xl font-bold mb-4">ADD STANDARD MASTER</h1>
      <Card className="">
        <StandardMasterForm defaultValues={defaultValues} onSubmit={onSubmit} />
      </Card>
    </>
  );
};

export default StandardMasterAdd;
