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
import { Link } from "react-router-dom";
import ActionsPopupPayment from "./data-table-row-actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useQuery } from "@tanstack/react-query";

const headers = [
  { label: "ID", value: "id" },
  { label: "Fee Type", value: "fee_master" },
  { label: "Standard", value: "standard" },
  { label: "Year", value: "year" },
  { label: "Amount", value: "amount" },
];

const getFeeTypeData = async () => {
  const token = localStorage.getItem("Token");

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  const res = await axios.get(
    "http://127.0.0.1:8000/fee-types/search/",
    config
  );
  return res.data;
};

function FeesType() {

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [feeTypeId, setFeeTypeId] = useState();

  const { data, isLoading } = useQuery({
    queryKey: ["feetypes"],
    queryFn: getFeeTypeData,
  });
  const students = data?.data;
  const startIndex = page * pageSize;
  const endIndex = (page + 1) * pageSize;

  const visibleStudents = students?.slice(startIndex, endIndex);

  const openAlertDeleteBox = (id) => {
    setFeeTypeId(id);
    setOpenAlert(true);
  };

  const handleDeleteStudent = async (feeTypeId) => {
    alert(feeTypeId);
    // try {
    //   const token = localStorage.getItem("Token");
    //   const config = {
    //     headers: {
    //       Authorization: `Token ${token}`,
    //     },
    //   };
    //   await axios.delete(
    //     `http://127.0.0.1:8000/students/${studentId}/delete/`,
    //     config
    //   );
    //   setOpenAlert(false);
    //   getData();
    //   toast.success("Student Delete Successfully");
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Failed To Delete Student!");
    // }
  };
  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <>
      <AlertDialog open={openAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete and remove your data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteStudent(feeTypeId)}
              className="bg-[red] text-white hover:bg-red-500"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
                    <ActionsPopupPayment
                      id={fee.id}
                      openAlertDeleteBox={openAlertDeleteBox}
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

export default FeesType;
