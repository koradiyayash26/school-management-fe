import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import ActionsPopupSchoolStudent from "@/components/school-student/data-table-row-action";
import { useSchoolStudents } from "@/hooks/use-school-student";

const headers = [
  { label: "ID", value: "id" },
  { label: "Standard", value: "standard" },
  { label: "Grno", value: "grno" },
  { label: "First Name", value: "first_name" },
  { label: "Middle Name", value: "middle_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Year", value: "year" },
  { label: "Note", value: "note" },
  { label: "Update Date", value: "update_date" },
];

function SchoolStudentPage() {
  const { data, isLoading, error } = useSchoolStudents();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const students = data?.data || [];
  const startIndex = page * pageSize;
  const endIndex = (page + 1) * pageSize;

  const filteredStudents = students.filter((student) =>
    ["first_name", "middle_name", "last_name", "year", "standard", "grno"].some(
      (field) =>
        student[field]?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const visibleStudents = filteredStudents.slice(startIndex, endIndex);

  const handlePageSizeChange = (value) => {
    setPageSize(parseInt(value));
    setPage(0);
  };

  if (isLoading) return <>Loading...</>;

  if (error) return <>Error</>;

  return (
    <>
      <h1>SCHOOL STUDENT</h1>
      <div className="block md:flex md:justify-between gap-2">
        <div className="w-full">
          <Input
            className="w-full md:max-w-sm mb-2 md:mb-0 md:mr-2"
            placeholder="Search by year and standard"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 md:m-0 mt-4">
          <Link to="/school-student/add">
            <Button>Add</Button>
          </Link>
        </div>
      </div>
      <ScrollArea className="rounded-md border max-w-[1280px] h-[calc(80vh-120px)]">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index}>{header.label}</TableHead>
              ))}
              <TableHead className="bg-[#151518]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          {!students || filteredStudents.length === 0 ? (
            <TableBody>
              <TableRow className="text-center">
                <TableCell
                  colSpan={headers.length + 1}
                  className="uppercase text-lg"
                >
                  No Data Found
                </TableCell>
              </TableRow>
            </TableBody>
          ) : null}
          <TableBody>
            {visibleStudents.map((student) => (
              <TableRow key={student.id}>
                {headers.map((header) => (
                  <TableCell key={header.value} className="capitalize">
                    {header.value === "grno"
                      ? student.student.grno
                      : header.value === "first_name"
                      ? student.student.first_name
                      : header.value === "middle_name"
                      ? student.student.middle_name
                      : header.value === "last_name"
                      ? student.student.last_name
                      : header.value === "standard"
                      ? student.standard === "13"
                        ? "Balvatika"
                        : student.standard
                      : student[header.value] || "None"}
                  </TableCell>
                ))}
                <TableCell className="sticky top-0 right-0 z-[1] bg-[#151518]">
                  <ActionsPopupSchoolStudent id={student.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="block text-center  md:flex md:items-center md:justify-end md:space-x-2 py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-[160px]">
              {pageSize <= 10
                ? "Items per page"
                : pageSize == "9999"
                ? "Show All"
                : pageSize}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup
              value={pageSize.toString()}
              onValueChange={(value) => handlePageSizeChange(value)}
            >
              <DropdownMenuRadioItem value="10">10</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="20">20</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="30">30</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="40">40</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="50">50</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="9999">
                Show All
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="space-x-2 md:m-0 mt-2">
          <Button
            variant="outline"
            onClick={() => setPage(Math.max(page - 1, 0))}
            size="sm"
            disabled={page === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setPage(page + 1)}
            size="sm"
            disabled={endIndex >= students.length}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

export default SchoolStudentPage;
