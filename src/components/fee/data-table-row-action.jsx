import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Ellipsis,
  SquareArrowOutUpRight,
  SquarePen,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ActionsPopupFee = ({ id, openAlertDeleteBox,standard,year }) => {
  const navigate = useNavigate();
  const editFeeType = (id) => {
    navigate(`/fee-type/edit/${id}`);
  };

  const assingStudent = (id,std,year) => {
    navigate(`/fee-type/${id}/${std}/${year}/student-assign`);
  };

  return (
    <>
      <DropdownMenu className="">
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <Ellipsis className="h-6 w-6 rotate-90" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => assingStudent(id,standard,year)}>
            Assign
            <DropdownMenuShortcut>
              <SquareArrowOutUpRight className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => editFeeType(id)}>
            Edit
            <DropdownMenuShortcut>
              <SquarePen className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openAlertDeleteBox(id)}>
            Delete
            <DropdownMenuShortcut>
              <Trash2 className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ActionsPopupFee;
