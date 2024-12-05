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

  const handleTriggerClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={handleTriggerClick}>
          <Button
            variant="outline"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted border"
          >
            <Ellipsis className="h-6 w-6 rotate-90" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {Bonafide ? (
            <Link to={`/bonafide/${id}/`} onClick={(e) => e.stopPropagation()}>
              <DropdownMenuItem>
                Bonafide
                <DropdownMenuShortcut>
                  <NotepadText className="h-4 w-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          ) : (
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                editStudent(id);
              }}
            >
              Edit
              <DropdownMenuShortcut>
                <SquarePen className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
          {Birth ? (
            <Link to={`/birth/${id}/`} onClick={(e) => e.stopPropagation()}>
              <DropdownMenuItem>
                Birth Certificate
                <DropdownMenuShortcut>
                  <Cake className="h-4 w-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          ) : (
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                openAlertDeleteBox(id);
              }}
            >
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
