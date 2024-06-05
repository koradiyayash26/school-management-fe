import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, SquarePen } from "lucide-react";
import { json, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { addStudentsAddTogetDatastdyear } from "@/services/student-update";
import toast, { Toaster } from "react-hot-toast";

const ActionsPopupStudentUpdate = ({ std, year }) => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data) => addStudentsAddTogetDatastdyear(data),
    onSuccess: () => {
      console.log("Data Created");
    },
    onError: (error) => {
      toast.error(`Failed To Get Students: ${error.message}`);
    },
  });
  const updateStudent = (std, year) => {
    let data = {
      standard: std,
      year: year,
    };
    mutation.mutate(data);
    navigate(`/update/students/${std}/${year}`);
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
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <DropdownMenu className="">
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <Ellipsis className="h-6 w-6 rotate-90" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => updateStudent(std, year)}>
            Update
            <DropdownMenuShortcut>
              <SquarePen className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ActionsPopupStudentUpdate;
