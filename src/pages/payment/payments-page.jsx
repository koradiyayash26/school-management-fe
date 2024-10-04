import ActionsPopupPaymentFee from "@/components/payment/data-table-row-action";
import Spinner from "@/components/spinner/spinner";
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
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePayment, usePaymentFeeList } from "@/hooks/use-payment";
import { deletePaymentFee } from "@/services/payment-service";
import { useMutation } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Info,
} from "lucide-react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { format, isWithinInterval, parseISO } from "date-fns";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const headers = [
  { label: "Fee Paid Date", value: "fee_paid_date" },
  { label: "Standard", value: "student__standard" },
  { label: "First Name", value: "student__first_name" },
  { label: "Last Name", value: "student__last_name" },
  { label: "Middle Name", value: "student__middle_name" },
  { label: "Certificate No", value: "id" },
  { label: "GR No", value: "student__grno" },
  { label: "Note", value: "note" },
  { label: "Amount", value: "paid" },
];

const years = [
  { value: "2030", label: "2030" },
  { value: "2029", label: "2029" },
  { value: "2028", label: "2028" },
  { value: "2027", label: "2027" },
  { value: "2026", label: "2026" },
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
  { value: "2018", label: "2018" },
  { value: "2017", label: "2017" },
  { value: "2016", label: "2016" },
  { value: "2015", label: "2015" },
  { value: "2014", label: "2014" },
  { value: "2013", label: "2013" },
  { value: "2012", label: "2012" },
  { value: "2011", label: "2011" },
  { value: "2010", label: "2010" },
  { value: "2009", label: "2009" },
  { value: "2008", label: "2008" },
  { value: "2007", label: "2007" },
  { value: "2006", label: "2006" },
  { value: "2005", label: "2005" },
  { value: "2004", label: "2004" },
  { value: "2003", label: "2003" },
  { value: "2002", label: "2002" },
  { value: "2001", label: "2001" },
  { value: "2000", label: "2000" },
];

const PaymentsPage = () => {
  const { data, isLoading } = usePayment();

  const {
    data: paymentFeeData,
    isLoading: paymentFeeLoading,
    refetch,
  } = usePaymentFeeList();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [search, setSearch] = useState("");
  const [searchPaymentStudent, setSearchPaymentStudent] = useState("");

  const [openAlert, setOpenAlert] = useState(false);
  const [paymentId, setPaymentId] = useState();

  const [selectedYear, setSelectedYear] = useState("");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });

  let studentsSearch = data?.data || [];
  let paymentFeeList = paymentFeeData?.data || [];

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const applyFilter = () => {
    setIsFilterApplied(true);
    setStartDate(dateRange.from);
    setEndDate(dateRange.to);
  };

  const clearFilter = () => {
    setSearch("");
    setDateRange({ from: undefined, to: undefined });
    setStartDate(null);
    setEndDate(null);
    setIsFilterApplied(false);
  };

  const filteredStudents = paymentFeeList?.filter((payment) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      payment.student__standard
        ?.toString()
        .toLowerCase()
        .includes(searchLower) ||
      payment.student__first_name?.toLowerCase().includes(searchLower) ||
      payment.student__last_name?.toLowerCase().includes(searchLower) ||
      payment.student__middle_name?.toLowerCase().includes(searchLower) ||
      payment.fee_paid_date?.toLowerCase().includes(searchLower) ||
      payment.id?.toString().includes(search) ||
      false;

    const paymentDate = parseISO(payment.fee_paid_date);
    const isWithinDateRange =
      startDate && endDate
        ? isWithinInterval(paymentDate, { start: startDate, end: endDate })
        : true;

    return (
      (!isFilterApplied || (matchesSearch && isWithinDateRange)) &&
      matchesSearch
    );
  });

  const visibleStudents = filteredStudents?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredStudents.length / pageSize);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(parseInt(newSize));
    setPage(1);
  };

  const mutation = useMutation({
    mutationFn: (paymentId) => deletePaymentFee(paymentId),
    onSuccess: () => {
      refetch();
      setOpenAlert(false);
      toast.success("History Fee Delete Successfully");
    },
  });

  const openAlertDeleteBox = (id) => {
    setPaymentId(id);
    setOpenAlert(true);
  };

  const handleValueChange = (value) => {
    setSelectedYear(value);
  };

  const handleAlert = () => {
    alert("Select Year");
  };

  if (isLoading || paymentFeeLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <>
      <h1 className="uppercase text-2xl font-bold mb-4">PAYMENT</h1>
      <div>
        <div>
          <div className="flex  flex-col md:flex-row items-center gap-8 mb-4">
            <Form>
              <Select onValueChange={handleValueChange}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Select a year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year.value} value={year.value}>
                      {year.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                className="w-full md:max-w-sm mb-2 md:mb-0  md:mr-2"
                placeholder="Search student"
                onChange={(e) => setSearchPaymentStudent(e.target.value)}
                disabled={!selectedYear}
              />
            </Form>
          </div>
        </div>
        <ScrollArea className="rounded-md border mt-6 w-full">
          <Table className="relative">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Pay</TableHead>
                <TableHead className="text-center">GRNO</TableHead>
                <TableHead className="text-center">FIRST NAME</TableHead>
                <TableHead className="text-center">MIDDLE NAME</TableHead>
                <TableHead className="text-center">LAST NAME</TableHead>
                <TableHead className="text-center">STANDARD</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentsSearch
                .filter((paymentData) => {
                  if (searchPaymentStudent.toLocaleLowerCase() === "") {
                    return false;
                  }
                  return (
                    paymentData.first_name
                      .toLocaleLowerCase()
                      .includes(searchPaymentStudent.toLocaleLowerCase()) ||
                    paymentData.last_name
                      .toLocaleLowerCase()
                      .includes(searchPaymentStudent.toLocaleLowerCase()) ||
                    paymentData.middle_name
                      .toLocaleLowerCase()
                      .includes(searchPaymentStudent.toLocaleLowerCase())
                  );
                })
                .map((paymentFeeData) => (
                  <TableRow key={paymentFeeData.id}>
                    <TableCell className="text-center">
                      {!searchPaymentStudent || !selectedYear ? (
                        <div onClick={handleAlert} className="cursor-pointer">
                          <Button disabled>Pay</Button>
                        </div>
                      ) : (
                        <Link
                          to={`/payment/${paymentFeeData.id}/${selectedYear}`}
                        >
                          <Button>Pay</Button>
                        </Link>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {paymentFeeData.grno}
                    </TableCell>
                    <TableCell className="capitalize text-center">
                      {paymentFeeData.first_name}
                    </TableCell>
                    <TableCell className="capitalize text-center">
                      {paymentFeeData.middle_name}
                    </TableCell>
                    <TableCell className="capitalize text-center">
                      {paymentFeeData.last_name}
                    </TableCell>
                    <TableCell className="text-center">
                      {paymentFeeData.standard === "13"
                        ? "Balvatika"
                        : paymentFeeData.standard}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
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
              onClick={() => mutation.mutate(paymentId)}
              className="bg-[red] text-white hover:bg-red-500"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <h1 className="uppercase text-2xl font-bold">FEE HISTORY</h1>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            className="w-full md:w-1/3"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className={cn(
                  "w-auto justify-start text-left font-normal",
                  !dateRange.from && !dateRange.to && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button onClick={applyFilter}>Apply Filter</Button>
          <Button onClick={clearFilter} variant="outline">
            Clear Filter
          </Button>
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
            {!paymentFeeList || filteredStudents.length === 0 ? (
              <TableRow className="text-center">
                <TableCell
                  colSpan={headers.length + 1}
                  className="uppercase text-lg"
                >
                  No Data Found
                </TableCell>
              </TableRow>
            ) : (
              visibleStudents.map((payment) => (
                <TableRow key={payment.id}>
                  {headers.map((header) => (
                    <TableCell
                      key={header.value}
                      className="capitalize whitespace-nowrap"
                    >
                      {header.value === "standard"
                        ? payment.standard || "None"
                        : header.value === "paid"
                        ? (payment.paid || 0) + (payment.waived || 0)
                        : payment[header.value] == 13
                        ? "Balvatika"
                        : payment[header.value] || "-"}
                    </TableCell>
                  ))}
                  <TableCell className="">
                    <ActionsPopupPaymentFee
                      id={payment.id}
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
      <div className="flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
        <div className="whitespace-nowrap text-sm dark:text-white text-black font-medium order-2 md:order-1">
          {filteredStudents?.length > 0
            ? `Showing ${Math.min(
                (page - 1) * pageSize + 1,
                filteredStudents.length
              )} - ${Math.min(page * pageSize, filteredStudents.length)} of ${
                filteredStudents.length
              }.`
            : "No entries to show"}
        </div>
        <div className="flex items-center space-x-2 order-1 sm:order-2">
          <p className="whitespace-nowrap text-sm font-medium hidden sm:inline">
            Rows per page
          </p>
          <Select
            value={pageSize.toString()}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger
              className={`h-8 w-[70px] ${
                filteredStudents.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="order-3 w-full sm:w-auto">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  aria-label="Go to last page"
                  variant="outline"
                  size="icon"
                  className="size-8 lg:flex"
                  onClick={() => handlePageChange(1)}
                  disabled={page === 1 || totalPages === 0}
                >
                  <ChevronsLeft className="size-4" aria-hidden="true" />
                </Button>
              </PaginationItem>
              <Button
                aria-label="Go to last page"
                variant="outline"
                size="icon"
                className="size-8 lg:flex"
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page === 1 || totalPages === 0}
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
              </Button>
              <Button
                aria-label="Go to last page"
                variant="outline"
                size="icon"
                className="size-8 lg:flex"
                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages || totalPages === 0}
              >
                <ChevronRight className="size-4" aria-hidden="true" />
              </Button>
              <PaginationItem>
                <Button
                  aria-label="Go to last page"
                  variant="outline"
                  size="icon"
                  className="size-8 lg:flex"
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, totalPages))
                  }
                  disabled={page === totalPages || totalPages === 0}
                >
                  <ChevronsRight className="size-4" aria-hidden="true" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default PaymentsPage;
