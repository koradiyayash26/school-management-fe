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
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
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
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import ActionsPopupFee from "@/components/fee/data-table-row-action";
import { deleteFeeType } from "@/services/fees-service";
import { useFeeType } from "@/hooks/use-fees";
import Spinner from "@/components/spinner/spinner";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const headers = [
  { label: "ID", value: "id" },
  { label: "Fee Type", value: "fee_master" },
  { label: "Standard", value: "standard" },
  { label: "Year", value: "year" },
  { label: "Amount", value: "amount" },
];

function FeesTypePage() {
  const { data, isLoading, error, refetch } = useFeeType();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [feeTypeId, setFeeTypeId] = useState();

  const students = data?.data || [];
  const startIndex = page * pageSize;
  const endIndex = (page + 1) * pageSize;

  const handlePageSizeChange = (value) => {
    setPageSize(parseInt(value));
    setPage(0);
  };

  const openAlertDeleteBox = (id) => {
    setFeeTypeId(id);
    setOpenAlert(true);
  };

  const mutation = useMutation({
    mutationFn: deleteFeeType,
    onSuccess: () => {
      refetch();
      setOpenAlert(false);
      toast.success("FeeType Delete Successfully");
    },
  });

  const filteredStudents = students.filter((fee) => {
    return search.toLowerCase() === ""
      ? fee
      : fee.year.toLowerCase().includes(search);
  });

  const visibleStudents = filteredStudents.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredStudents.length / pageSize);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page + 1 - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setPage(i - 1)}
          className={`px-3 py-1 rounded-md ${
            page === i - 1
              ? "bg-primary text-primary-foreground"
              : "bg-background hover:bg-accent"
          }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  if (isLoading)
    return (
      <>
        <Spinner />
      </>
    );

  if (error) return <>Error</>;

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
              onClick={() => mutation.mutate(feeTypeId)}
              className="bg-[red] text-white hover:bg-red-500"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <h1 className="uppercase mb-4 text-2xl font-bold">FEE TYPE</h1>
      <div className="block md:flex md:justify-between gap-2">
        <div className="w-full">
          <Input
            className="w-full md:max-w-sm mb-2 md:mb-0  md:mr-2"
            placeholder="Search By Year"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 md:m-0 mt-4">
          <Link to="/fee-type/add">
            <Button>Add</Button>
          </Link>
        </div>
      </div>
      <ScrollArea className="rounded-md border w-full h-[calc(80vh-120px)]">
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
              visibleStudents.map((fee) => (
                <TableRow key={fee.id}>
                  {headers.map((header) => (
                    <TableCell key={header.value} className="capitalize">
                      {header.value === "fee_master"
                        ? fee.fee_master?.name || "None"
                        : fee[header.value] === 13
                        ? "Balvatika"
                        : fee[header.value] || "None"}
                    </TableCell>
                  ))}
                  <TableCell className="z-[1]">
                    <ActionsPopupFee
                      id={fee.id}
                      standard={fee.standard}
                      year={fee.year}
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
      <div className="w-full flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 py-4 text-sm">
        <div className="w-full sm:w-auto flex items-center justify-center sm:justify-start text-muted-foreground">
          <span className="text-sm dark:text-white text-black font-medium order-2 md:order-1">
            Showing {startIndex + 1}-
            {Math.min(endIndex, filteredStudents?.length)} of{" "}
            {filteredStudents?.length}.
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium hidden md:hidden lg:inline sm:inline ">
            Rows per page
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 w-[70px]">
                {pageSize}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {[10, 20, 30, 40, 50].map((size) => (
                <DropdownMenuItem
                  key={size}
                  onSelect={() => handlePageSizeChange(size)}
                >
                  {size}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage(Math.max(page - 1, 0))}
                  disabled={page === 0}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  onClick={() => setPage(0)}
                  isActive={page === 0}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {page > 1 && <PaginationEllipsis className="hidden sm:flex" />}
              {page !== 0 && page !== totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink isActive>{page + 1}</PaginationLink>
                </PaginationItem>
              )}
              {page < totalPages - 2 && (
                <PaginationEllipsis className="hidden sm:flex" />
              )}
              {totalPages > 1 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setPage(totalPages - 1)}
                    isActive={page === totalPages - 1}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage(Math.min(page + 1, totalPages - 1))}
                  disabled={page === totalPages - 1}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
}

export default FeesTypePage;
