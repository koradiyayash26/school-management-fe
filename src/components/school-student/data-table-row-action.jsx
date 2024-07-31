import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ActionsPopupSchoolStudent = ({ id }) => {
  const navigate = useNavigate();
  const editSchoolStudent = (id) => {
    navigate(`/school-student/edit/${id}`);
  };

  return (
    <>
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
          <DropdownMenuItem onClick={() => editSchoolStudent(id)}>
            Edit
            <DropdownMenuShortcut>
              <SquarePen className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ActionsPopupSchoolStudent;
