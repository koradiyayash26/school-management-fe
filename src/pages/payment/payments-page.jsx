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
import { Info } from "lucide-react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { format, isWithinInterval, parseISO } from 'date-fns';

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

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [search, setSearch] = useState("");
  const [searchPaymentStudent, setSearchPaymentStudent] = useState("");

  const [openAlert, setOpenAlert] = useState(false);
  const [paymentId, setPaymentId] = useState();

  const [selectedYear, setSelectedYear] = useState("");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  let studentsSearch = data?.data || [];
  let paymentFeeList = paymentFeeData?.data || [];

  const startIndex = page * pageSize;
  const endIndex = (page + 1) * pageSize;

  const applyFilter = () => {
    setIsFilterApplied(true);
  };

  const clearFilter = () => {
    setSearch("");
    setStartDate(null);
    setEndDate(null);
    setIsFilterApplied(false);
  };

  const filteredStudents = paymentFeeList?.filter((payment) => {
    if (!isFilterApplied) return true;
    
    const searchLower = search.toLowerCase();
    const matchesSearch = (
      (payment.student__standard?.toString().toLowerCase().includes(searchLower) || false) ||
      (payment.student__first_name?.toLowerCase().includes(searchLower) || false) ||
      (payment.student__last_name?.toLowerCase().includes(searchLower) || false) ||
      (payment.student__middle_name?.toLowerCase().includes(searchLower) || false) ||
      (payment.fee_paid_date?.toLowerCase().includes(searchLower) || false) ||
      (payment.id?.toString().includes(search) || false)
    );

    const paymentDate = parseISO(payment.fee_paid_date);
    const isWithinDateRange = startDate && endDate ? 
      isWithinInterval(paymentDate, { start: startDate, end: endDate }) : 
      true;

    return matchesSearch && isWithinDateRange;
  });

  const visibleStudents = filteredStudents?.slice(startIndex, endIndex);

  const handlePageSizeChange = (value) => {
    setPageSize(parseInt(value));
    setPage(0);
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
      <h1>PAYMENT</h1>
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
      <h1>FEE HISTORY</h1>
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
              <Button variant="outline">
                {startDate ? format(startDate, "yyyy-MM-dd") : "Start Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {endDate ? format(endDate, "yyyy-MM-dd") : "End Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button onClick={applyFilter}>Apply Filter</Button>
          <Button onClick={clearFilter} variant="outline">Clear Filter</Button>
        </div>
      </div>
      <ScrollArea className="rounded-md border w-full h-[calc(80vh-120px)]">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index}>{header.label}</TableHead>
              ))}
              <TableHead className="bg-[#151518]">Actions</TableHead>
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
                    <TableCell key={header.value} className="capitalize">
                      {header.value === "standard"
                        ? payment.standard || "None"
                        : header.value === "paid"
                        ? (payment.paid || 0) + (payment.waived || 0)
                        : payment[header.value] == 13
                        ? "Balvatika"
                        : payment[header.value] || "None"}
                    </TableCell>
                  ))}
                  <TableCell className="sticky top-0 right-0 z-[1] bg-[#151518]">
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
            disabled={endIndex >= paymentFeeList.length}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default PaymentsPage;
