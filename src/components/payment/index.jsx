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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../ui/dropdown-menu";
import ActionsPopup from "../ui/data-table-row-actions";
import { Link } from "react-router-dom";

const headers = [
  { label: "ID", value: "id" },
  { label: "Fee Type", value: "fee_master" },
  { label: "Standard", value: "standard" },
  { label: "Year", value: "year" },
  { label: "Amount", value: "amount" },
];

function FeesType() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const getFeeTypeData = () => {
    const token = localStorage.getItem("Token");
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    return axios
      .get("http://127.0.0.1:8000/fee-types/search/", config)
      .then(function (response) {
        setStudents(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getFeeTypeData();
  }, []);

  const startIndex = page * pageSize;
  const endIndex = (page + 1) * pageSize;

  const visibleStudents = students.slice(startIndex, endIndex);

  return (
    <>
      <h1>FEE TYPE</h1>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <Input
          className="w-full md:max-w-sm mb-2 md:mb-0  md:mr-2"
          placeholder="Search By Year"
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
      <div>
        <Link to="/fee-type/add">
          <Button>Add</Button>
        </Link>
      </div>
      <ScrollArea className="rounded-md border max-w-[1280px] h-[calc(80vh-120px)]">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index}>{header.label}</TableHead>
              ))}
              <TableHead className="">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleStudents
              .filter((fee) => {
                return search.toLocaleLowerCase() === ""
                  ? fee
                  : fee.year.toLocaleLowerCase().includes(search);
              })
              .map((fee) => (
                <TableRow key={fee.id}>
                  {headers.map((header) => (
                    <TableCell key={header.value} className="capitalize">
                      {header.value === "fee_master"
                        ? fee.fee_master.name
                        : fee[header.value] || "None"}
                    </TableCell>
                  ))}
                  <TableCell className="">
                    <ActionsPopup />
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

export default FeesType;
