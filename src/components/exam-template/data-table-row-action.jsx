import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ClipboardList,
  Ellipsis,
  SquareArrowOutUpRight,
  SquarePen,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ActionsPopupExamTemplate = ({ id, standard, openAlertDeleteBox }) => {
  const navigate = useNavigate();

  const editexamtemplate = (id) => {
    navigate(`/exam-template/edit/${id}`);
  };

  const assingExmaMarks = (id, standard) => {
    navigate(`/exam-template/mark-assign/${standard}/${id}`);
  };

  const assingExmaMarksEdit = (id, standard) => {
    navigate(`/exam-template/mark-assign-edit/${standard}/${id}/`);
  };

  return (
    <>
      <DropdownMenu className="">
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted border"
          >
            <Ellipsis className="h-6 w-6 rotate-90" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => assingExmaMarks(id, standard)}>
            Assign Mark
            <DropdownMenuShortcut>
              <SquareArrowOutUpRight className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => assingExmaMarksEdit(id, standard)}>
            Mark List
            <DropdownMenuShortcut>
              <ClipboardList className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => editexamtemplate(id)}>
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

export default ActionsPopupExamTemplate;
