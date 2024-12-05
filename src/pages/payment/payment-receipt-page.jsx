import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Printer } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePaymentReceiptDetailsBytid } from "@/hooks/use-payment";
import numWords from "num-words";
import Spinner from "@/components/spinner/spinner";

const PaymentReceiptPage = () => {
  const { id } = useParams();

  const { data, isLoading } = usePaymentReceiptDetailsBytid(id);

  const studentData = data?.data || {};

  const amountWords = (total_fee) => {
    total_fee = numWords(parseInt(studentData.total_fee));
    return total_fee;
  };

  const handleDownloadPdf = () => {
    alert("PDF Downloaded");
  };

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <>
      <div className="border border-white-200 rounded-lg shadow-sm text-center py-2">
        <h3>FEE PAYMENT RECEIPT</h3>
      </div>
      <div className="flex justify-between">
        <div>
          <h3 className="mb-2">
            <span className="text-white font-semibold">No :</span>
            <span className="text-[#9ca3af]"> S.2651</span>
          </h3>
        </div>
        <div>
          <h3 className="mb-2">
            <span className="text-white font-semibold">Date :</span>
            <span className="text-[#9ca3af]">
              &nbsp;
              {studentData.receipt.fee_paid_date}
            </span>
          </h3>
        </div>
      </div>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="border border-white-200 rounded-lg shadow-sm">
            <figure className="flex flex-col items-center justify-center p-8 border-b rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e">
              <blockquote className="w-full mx-auto mb-4 text-gray-500  dark:text-gray-400">
                <h3>
                  <span className="text-white font-semibold">
                    Student Name :
                  </span>
                  <span className="capitalize">
                    &nbsp;
                    {studentData.receipt.student.first_name}&nbsp;
                    {studentData.receipt.student.middle_name}&nbsp;
                    {studentData.receipt.student.last_name}
                  </span>
                </h3>
                <h3 className="font-semibold my-10 text-gray-900 dark:text-white">
                  <div className="block lg:flex justify-between">
                    <h3 className="mb-2">
                      <span className="text-white font-semibold">GR.NO :</span>
                      <span className="text-[#9ca3af]">
                        &nbsp;
                        {studentData.receipt.student.grno}
                      </span>
                    </h3>
                    <h3 className="mb-2">
                      <span className="text-white font-semibold">
                        Standard :&nbsp;
                      </span>
                      <span className="text-[#9ca3af]">
                        {studentData.fee_type?.standard?.name === "13"
                          ? "Balvatika"
                          : studentData.fee_type?.standard?.name || ""}
                      </span>
                    </h3>
                  </div>
                </h3>
                <div className="my-4">
                  <Table className="relative border">
                    <TableHeader>
                      <TableRow className="border">
                        <TableHead className="text-white text-center ">
                          Sr.No
                        </TableHead>
                        <TableHead className="text-white text-center border">
                          Fee Type
                        </TableHead>
                        <TableHead className="text-white text-center border">
                          Amount
                        </TableHead>
                        {studentData.amount_waived !== 0 && (
                          <TableHead className="text-white text-center border">
                            Waived
                          </TableHead>
                        )}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="border text-center">1</TableCell>
                        <TableCell className="border text-center">
                          {studentData.fee_type.fee_master.name}
                        </TableCell>
                        <TableCell className="border text-center">
                          {studentData.amount_paid}
                        </TableCell>
                        {studentData.amount_waived !== 0 && (
                          <TableCell className="border text-center">
                            {studentData.amount_waived}
                          </TableCell>
                        )}
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-end" colSpan="2">
                          Total
                        </TableCell>
                        {studentData.amount_waived !== 0 ? (
                          <TableCell colSpan="2" className="border text-center">
                            {studentData.total_fee}
                          </TableCell>
                        ) : (
                          <TableCell className="border text-center">
                            {studentData.total_fee}
                          </TableCell>
                        )}
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </blockquote>
              <h1 className="text-center">
                In Word : {amountWords(studentData.total_fee)}
              </h1>
              <div className="md:flex block  justify-between w-full mt-6">
                <div className="mb-12 md:m-0">
                  <h4 className="text-sm text-center">Payment Mode</h4>
                  <div className="md:border-b my-1"></div>
                  <h4 className="text-sm text-center"> By CASH-CASH</h4>
                </div>
                <div className="flex self-end">
                  <div>
                    <div className="border-b my-1"></div>
                    Authorized Signatures
                  </div>
                </div>
              </div>
            </figure>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={handleDownloadPdf}>
            <Printer className="w-4 h-4 mr-2" />
            PDF
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
};

export default PaymentReceiptPage;
