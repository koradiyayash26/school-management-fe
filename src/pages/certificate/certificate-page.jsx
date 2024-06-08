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
import ActionsPopup from "@/components/ui/data-table-row-actions";
import { useCertificate } from "@/hooks/use-certificate";
import { SearchX } from "lucide-react";

const headers = [
  { label: "ID", value: "id" },
  { label: "GR Number", value: "grno" },
  { label: "Last Name", value: "last_name" },
  { label: "First Name", value: "first_name" },
  { label: "Middle Name", value: "middle_name" },
  { label: "Gender", value: "gender" },
  { label: "Birth Date", value: "birth_date" },
  { label: "Standard", value: "standard" },
  { label: "Section", value: "section" },
  { label: "Status", value: "status" },
];

function CertificatePage() {
  const { data, isLoading, error, refetch } = useCertificate();
  let students = data?.data || [];

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const startIndex = page * pageSize;
  const endIndex = (page + 1) * pageSize;

  const handlePageSizeChange = (value) => {
    setPageSize(parseInt(value));
    setPage(0);
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  const filteredStudents = students.filter((student) => {
    return search.toLocaleLowerCase() === ""
      ? student
      : student.first_name.toLocaleLowerCase().includes(search) ||
          student.last_name.toLocaleLowerCase().includes(search) ||
          student.middle_name.toLocaleLowerCase().includes(search);
  });

  const visibleStudents = filteredStudents.slice(startIndex, endIndex);

  return (
    <>
      <h1 className="uppercase">certificate</h1>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <Input
          className="w-full md:max-w-sm mb-2 md:mb-0 md:mr-2"
          placeholder="Search By Name"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ScrollArea className="rounded-md border max-w-[1280px] h-[calc(80vh-120px)]">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index}>{header.label}</TableHead>
              ))}
              <TableHead className="">Certificate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleStudents.length === 0 || !students ? (
              <TableRow className="text-start md:text-center">
                <TableCell
                  colSpan={headers.length + 1}
                  className="uppercase text-lg"
                >
                  No Data Found
                </TableCell>
              </TableRow>
            ) : (
              visibleStudents.map((student) => (
                <TableRow key={student.id}>
                  {headers.map((header) => (
                    <TableCell key={header.value}>
                      {(header.value === "standard" ||
                        header.value === "admission_std") &&
                      student[header.value] == 13
                        ? "Balvatika"
                        : student[header.value] || "None"}
                    </TableCell>
                  ))}
                  <TableCell className="">
                    <ActionsPopup
                      Bonafide="Bonafide"
                      Birth="Birth Certificate"
                      id={student.id}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
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

export default CertificatePage;
