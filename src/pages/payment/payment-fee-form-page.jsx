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
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePaymentStudentFee } from "@/hooks/use-payment";
import {
  deletePaymentFee,
  patchPaymentFeeData,
} from "@/services/payment-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, TriangleAlert } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const headers = [
  { label: "Date", value: "fee_paid_date" },
  { label: "First Name", value: "student__first_name" },
  { label: "Last Name", value: "student__last_name" },
  { label: "Middle Name", value: "student__middle_name" },
  { label: "Grno", value: "student__grno" },
  { label: "Certificate No", value: "id" },
  { label: "Standard", value: "student__standard" },
  { label: "Paid", value: "paid" },
  { label: "Note", value: "note" },
];

const PaymentFeeFormPage = () => {
  const { id, year } = useParams();

  const [openAlert, setOpenAlert] = useState(false);
  const [paymentId, setPaymentId] = useState();

  const { data, isLoading, error, refetch } = usePaymentStudentFee(id, year);

  let studentPaymentHistory = data?.receipt;
  let studentDetail = data?.student;
  let studentFeeDetail = data?.fees;
  let studentFeeTotal = data?.fee_total;

  const todayDate = format(new Date(), "dd-MM-yyyy");

  const defaultValues = {
    fee_paid_date: todayDate,
    note: "fees",
  };

  const mutation = useMutation({
    mutationFn: (formattedData) => patchPaymentFeeData(formattedData),
    onSuccess: () => {
      refetch();
      toast.success("Fee Collected Successfully");
    },
  });

  const onSubmit = (data) => {
    const formattedData = {
      fee_paid_date: data.fee_paid_date
        ? format(new Date(data.fee_paid_date), "yyyy-MM-dd")
        : null,
      fees: data.i.map((item, index) => ({
        ...item,
        fee_type__id: studentFeeDetail[index]?.fee_type__id || null,
        amount_paid: Number(item.amount_paid),
        amount_waived: Number(item.amount_waived),
      })),
      student_id: studentDetail?.id || null,
      note: data.note, // Keep the note field if needed
    };
    console.log(formattedData);
    mutation.mutate(formattedData);
  };

  const form = useForm({
    defaultValues,
    onSubmit,
  });

  const mutationFeeList = useMutation({
    mutationFn: (paymentId) => deletePaymentFee(paymentId),
    onSuccess: (res) => {
      refetch();
      setOpenAlert(false);
      toast.success("History Fee Delete Successfully");
      form.reset();
    },
  });

  const openAlertDeleteBox = (id) => {
    setPaymentId(id);
    setOpenAlert(true);
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return (
      <>
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
          <p className="mb-4 text-lg text-gray-600">
            Oops!
            <p className="capitalize inline-block">
              {error?.response?.data?.alert}
            </p>
          </p>
          <div className="animate-bounce">
            <svg
              className="mx-auto h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </div>
          <p className="mt-4 text-gray-600">
            Let's get you back&nbsp;
            <a href="/payment" className="text-blue-500">
              Payment
            </a>
            .
          </p>
        </div>
      </>
    );
  }

  return (
    <div>
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
              onClick={() => mutationFeeList.mutate(paymentId)}
              className="bg-[red] text-white hover:bg-red-500"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <ScrollArea className="rounded-md border mt-6 max-w-[1280px]">
        <Table className="relative">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead colSpan="4" className="text-center border text-base">
                Student Detail
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center border">
                Name: {studentDetail.name}
              </TableCell>
              <TableCell className="text-center border">
                Standard:&nbsp;
                {studentDetail.standard === "13"
                  ? "Balvatika"
                  : studentDetail.standard}
              </TableCell>
              <TableCell className="text-center border">
                Section: {studentDetail.section}
              </TableCell>
              <TableCell className="text-center border">
                Address: {studentDetail.address || "None"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <ScrollArea className="rounded-md border mt-6 max-w-[1280px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onReset={form.reset}
            className="space-y-2 w-full"
          >
            <Table className="relative">
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-center border">STD</TableHead>
                  <TableHead className="text-center border">Fee Type</TableHead>
                  <TableHead className="text-center border">
                    Total Amt.
                  </TableHead>
                  <TableHead className="text-center border">
                    Paid Amt.
                  </TableHead>
                  <TableHead className="text-center border">Waived</TableHead>
                  <TableHead className="text-center border">
                    Due Amount
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {studentFeeDetail.map((i, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="text-center border">
                        {studentDetail.standard === "13"
                          ? "Balvatika"
                          : studentDetail.standard}
                      </TableCell>
                      <TableCell className="text-center border">
                        {i.fee_type__fee_master__name}
                      </TableCell>
                      <TableCell className="text-center border">
                        <div className="flex justify-center">
                          {i?.fee_type__amount}
                        </div>
                      </TableCell>
                      <TableCell className="text-center border">
                        <div className="flex justify-center">
                          <FormField
                            className="text-center"
                            control={form.control}
                            // name="amount_paid"
                            name={`i.${index}.amount_paid`}
                            defaultValue={i.amount_paid}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-auto mx-auto"
                                    disabled={isLoading}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-center border">
                        <div className="flex justify-center">
                          <FormField
                            className="text-center"
                            control={form.control}
                            defaultValue={i.amount_waived}
                            // name="amount_waived"
                            name={`i.${index}.amount_waived`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-auto mx-auto"
                                    disabled={isLoading}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-center border">
                        <div className="flex justify-center">
                          {i.fee_type__amount - i.amount_paid - i.amount_waived}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell colSpan="2" className="text-center border">
                    TOTAL
                  </TableCell>
                  <TableCell className="text-center border">
                    {studentFeeTotal.total_fee}
                  </TableCell>
                  <TableCell className="text-center border">
                    {studentFeeTotal.amount_paid}
                  </TableCell>
                  <TableCell className="text-center border">
                    {studentFeeTotal.amount_waived}
                  </TableCell>
                  <TableCell className="text-center border">
                    {studentFeeTotal.total_fee -
                      studentFeeTotal.amount_paid -
                      studentFeeTotal.amount_waived}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center border"></TableCell>
                  <TableCell className="text-center border">Date:</TableCell>
                  <TableCell className="text-center border">
                    <FormField
                      control={form.control}
                      name="fee_paid_date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col self-end">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={
                                    ("pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground")
                                  }
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "MM-dd-yyyy")
                                  ) : (
                                    <span>Pick a Date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={new Date(field.value)}
                                onSelect={(date) => {
                                  field.onChange(format(date, "yyyy-MM-dd"));
                                }}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="text-center border">Note:</TableCell>
                  <TableCell className="text-center border">
                    <div className="flex justify-center">
                      <FormField
                        className="text-center"
                        control={form.control}
                        name="note"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="w-auto mx-auto"
                                disabled={isLoading}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-center border">
                    <Button type="submit">Submit</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </form>
        </Form>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <h1 className="my-6 text-xl">FEE HISTORY</h1>
      <ScrollArea className="rounded-md border mt-6 max-w-[1280px]">
        <Table className="relative">
          <TableHeader>
            <TableRow className="bg-muted/50">
              {headers.map((header, index) => (
                <TableHead key={index} className="text-center border">
                  {header.label}
                </TableHead>
              ))}
              <TableHead className="text-center border">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* <TableCell className="text-center border"> */}
            {studentPaymentHistory.map((student) => (
              <TableRow key={student.id}>
                {headers.map((header) => (
                  <TableCell key={header.value} className="text-center border">
                    {header.value === "standard"
                      ? student.standard || "None"
                      : student[header.value] == 13
                      ? "Balvatika"
                      : student[header.value] || "None"}
                  </TableCell>
                ))}
                <TableCell className="text-center border">
                  <ActionsPopupPaymentFee
                    id={student.id}
                    openAlertDeleteBox={openAlertDeleteBox}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default PaymentFeeFormPage;
