import React, { useState, useEffect } from "react";
import axios from "axios";
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
// import ActionsPopup from "./data-table-row-actions";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

import ActionsPopup from "@/components/ui/data-table-row-actions";

const headers = [
  { label: "ID", value: "id" },
  { label: "GR Number", value: "grno" },
  { label: "Last Name", value: "last_name" },
  { label: "First Name", value: "first_name" },
  { label: "Middle Name", value: "middle_name" },
  //   { label: "Mother Name", value: "mother_name" },
  { label: "Gender", value: "gender" },
  { label: "Birth Date", value: "birth_date" },
  //   { label: "Birth Place", value: "birth_place" },
  //   { label: "Mobile Number", value: "mobile_no" },
  //   { label: "Address", value: "address" },
  //   { label: "City", value: "city" },
  //   { label: "District", value: "district" },
  { label: "Standard", value: "standard" },
  { label: "Section", value: "section" },
  //   { label: "Last School", value: "last_school" },
  //   { label: "Admission Standard", value: "admission_std" },
  //   { label: "Admission Date", value: "admission_date" },
  //   { label: "Left School Standard", value: "left_school_std" },
  //   { label: "Left School Date", value: "left_school_date" },
  //   { label: "Religion", value: "religion" },
  //   { label: "Category", value: "category" },
  //   { label: "Caste", value: "caste" },
  //   { label: "UDISE Number", value: "udise_no" },
  //   { label: "Aadhar Number", value: "aadhar_no" },
  //   { label: "Account Number", value: "account_no" },
  //   { label: "Name on Passbook", value: "name_on_passbook" },
  //   { label: "Bank Name", value: "bank_name" },
  //   { label: "IFSC Code", value: "ifsc_code" },
  //   { label: "Bank Address", value: "bank_address" },
  //   { label: "Reason", value: "reason" },
  //   { label: "Note", value: "note" },
  //   { label: "Assessment", value: "assessment" },
  //   { label: "Progress", value: "progress" },
  { label: "Status", value: "status" },
];

function CertificatePage() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const getData = () => {
    const token = localStorage.getItem("Token");
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    return axios
      .get("http://127.0.0.1:8000/students/search/", config)
      .then(function (response) {
        setStudents(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const startIndex = page * pageSize;
  const endIndex = (page + 1) * pageSize;

  const visibleStudents = students.slice(startIndex, endIndex);

  const handlePageSizeChange = (value) => {
    setPageSize(parseInt(value));
    setPage(0);
  };

  return (
    <>
      <h1 className="uppercase">certificate</h1>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <Input
          className="w-full md:max-w-sm mb-2 md:mb-0  md:mr-2"
          placeholder="Search By Name"
          onChange={(e) => setSearch(e.target.value)}
        />
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
            {visibleStudents
              .filter((student) => {
                return search.toLocaleLowerCase() === ""
                  ? student
                  : student.first_name.toLocaleLowerCase().includes(search) ||
                      student.last_name.toLocaleLowerCase().includes(search) ||
                      student.middle_name.toLocaleLowerCase().includes(search);
              })
              .map((student) => (
                <TableRow key={student.id}>
                  {headers.map((header) => (
                    <TableCell key={header.value}>
                      {student[header.value] || "None"}
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
              ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground"></div>
        <div className="space-x-2">
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
