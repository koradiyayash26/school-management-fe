import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ActionsPopupHistoricalFees from "@/components/historical-fees/data-table-row-action";
import { useGetListHistoricalFee } from "@/hooks/use-historical-fee";
import { deleteHistoricalFee } from "@/services/historical-fee-service";

const headers = [
  { label: "Year", value: "year" },
  { label: "Date", value: "date" },
  { label: "Standard", value: "standard" },
  { label: "Name", value: "name" },
  { label: "Receipt No", value: "receipt_no" },
  { label: "Fee Type", value: "fee_type" },
  { label: "Amount", value: "amount" },
];

function HistoricalFeesPage() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [historicalFeeId, setHistoricalFeeId] = useState();

  const { data, isLoading, error, refetch } = useGetListHistoricalFee();

  const students = data?.data || [];
  const startIndex = page * pageSize;
  const endIndex = (page + 1) * pageSize;

  const handlePageSizeChange = (value) => {
    setPageSize(parseInt(value));
    setPage(0);
  };

  const filteredStudents = students.filter((historical) => {
    return search.toLocaleLowerCase() === ""
      ? historical
      : historical.name.toLocaleLowerCase().includes(search) ||
          historical.receipt_no.toLocaleLowerCase().includes(search) ||
          historical.date.toLocaleLowerCase().includes(search) ||
          historical.year.toLocaleLowerCase().includes(search) ||
          historical.fee_type.toLocaleLowerCase().includes(search);
  });

  const visibleStudents = filteredStudents.slice(startIndex, endIndex);

  const mutation = useMutation({
    mutationFn: (historicalFeeId) => deleteHistoricalFee(historicalFeeId),
    onSuccess: () => {
      refetch();
      setOpenAlert(false);
      toast.success("Student Delete Successfully");
    },
  });

  const openAlertDeleteBox = (id) => {
    setHistoricalFeeId(id);
    setOpenAlert(true);
  };
  const handleDeleteHistoricalFee = () => {
    mutation.mutate(historicalFeeId);
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error</>;
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
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
              onClick={() => handleDeleteHistoricalFee(historicalFeeId)}
              className="bg-[red] text-white hover:bg-red-500"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <h1>HISTORICAL FEE</h1>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <Input
          className="w-full md:max-w-sm mb-2 md:mb-0  md:mr-2"
          placeholder="Search"
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
        <Link to="/historical-fee/add">
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
            {!students || filteredStudents.length === 0 ? (
              <TableRow className="text-center">
                <TableCell
                  colSpan={headers.length + 1}
                  className="uppercase text-lg"
                >
                  No Data Found
                </TableCell>
              </TableRow>
            ) : (
              visibleStudents.map((historical) => (
                <TableRow key={historical.id}>
                  {headers.map((header) => (
                    <TableCell key={header.value} className="capitalize">
                      {header.value === "student"
                        ? (historical.student?.first_name || "None") +
                          " " +
                          (historical.student?.last_name || "None")
                        : header.value === "standard"
                        ? historical[header.value] === "13"
                          ? "Balvatika"
                          : historical[header.value] || "None"
                        : historical[header.value] || "None"}
                    </TableCell>
                  ))}
                  <TableCell className="">
                    <ActionsPopupHistoricalFees
                      id={historical.id}
                      openAlertDeleteBox={openAlertDeleteBox}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
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
            disabled={endIndex >= filteredStudents.length}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

export default HistoricalFeesPage;
