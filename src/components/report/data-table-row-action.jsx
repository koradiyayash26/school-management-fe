import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ClipboardList, Ellipsis, List, SquarePen, Trash2 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ActionsPopupReport = ({ id, openAlertDeleteBox }) => {
  const navigate = useNavigate();
  const editFeeType = (id) => {
    navigate(`/report/standard/${id}`);
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
          <DropdownMenuItem onClick={() => editFeeType(id)}>
            Get List
            <DropdownMenuShortcut>
              <ClipboardList className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ActionsPopupReport;
