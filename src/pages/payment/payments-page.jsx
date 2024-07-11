import ActionsPopupPaymentFee from "@/components/payment/data-table-row-action";
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
import { usePayment, usePaymentFeeList } from "@/hooks/use-payment";
import { deletePaymentFee } from "@/services/payment-service";
import { useMutation } from "@tanstack/react-query";
import { Info } from "lucide-react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

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
  { _id: "2030", name: "2030" },
  { _id: "2029", name: "2029" },
  { _id: "2028", name: "2028" },
  { _id: "2027", name: "2027" },
  { _id: "2026", name: "2026" },
  { _id: "2025", name: "2025" },
  { _id: "2024", name: "2024" },
  { _id: "2023", name: "2023" },
  { _id: "2022", name: "2022" },
  { _id: "2021", name: "2021" },
  { _id: "2020", name: "2020" },
  { _id: "2019", name: "2019" },
  { _id: "2018", name: "2018" },
  { _id: "2017", name: "2017" },
  { _id: "2016", name: "2016" },
  { _id: "2015", name: "2015" },
  { _id: "2014", name: "2014" },
  { _id: "2013", name: "2013" },
  { _id: "2012", name: "2012" },
  { _id: "2011", name: "2011" },
  { _id: "2010", name: "2010" },
  { _id: "2009", name: "2009" },
  { _id: "2008", name: "2008" },
  { _id: "2007", name: "2007" },
  { _id: "2006", name: "2006" },
  { _id: "2005", name: "2005" },
  { _id: "2004", name: "2004" },
  { _id: "2003", name: "2003" },
  { _id: "2002", name: "2002" },
  { _id: "2001", name: "2001" },
  { _id: "2000", name: "2000" },
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

  let studentsSearch = data?.data || [];
  let paymentFeeList = paymentFeeData?.data || [];

  const startIndex = page * pageSize;
  const endIndex = (page + 1) * pageSize;

  const filteredStudents = paymentFeeList?.filter((payment) => {
    return search.toLowerCase() === ""
      ? payment
      : payment.student__standard.toLocaleLowerCase().includes(search) ||
          payment.student__first_name.toLocaleLowerCase().includes(search) ||
          payment.student__last_name.toLocaleLowerCase().includes(search) ||
          payment.student__middle_name.toLocaleLowerCase().includes(search) ||
          payment.fee_paid_date.toLocaleLowerCase().includes(search);
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
    return <>Loading...</>;
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
      <div className="block md:flex md:justify-between gap-2">
        <div className="w-full">
          <Input
            className="w-full md:max-w-sm mb-2 md:mb-0  md:mr-2"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
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
