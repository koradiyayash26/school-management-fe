import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Cake,
  Ellipsis,
  NotepadText,
  Square,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Button } from "./button";
import { Link, useNavigate } from "react-router-dom";

const ActionsPopup = ({ id, openAlertDeleteBox, Birth, Bonafide }) => {
  const navigate = useNavigate();
  const editStudent = (id) => {
    navigate(`/student/edit/${id}`);
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
          {Bonafide ? (
            <Link to={`/bonafide/${id}/`}>
              <DropdownMenuItem>
                Bonafide
                <DropdownMenuShortcut>
                  <NotepadText className="h-4 w-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          ) : (
            <DropdownMenuItem onClick={() => editStudent(id)}>
              Edit
              <DropdownMenuShortcut>
                <SquarePen className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
          {Birth ? (
            <Link to={`/birth/${id}/`}>
              <DropdownMenuItem>
                Birth Certificate
                <DropdownMenuShortcut>
                  <Cake className="h-4 w-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          ) : (
            <DropdownMenuItem onClick={() => openAlertDeleteBox(id)}>
              Delete
              <DropdownMenuShortcut>
                <Trash2 className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ActionsPopup;
