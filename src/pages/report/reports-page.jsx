import ActionsPopupReport from "@/components/report/data-table-row-action";
import Spinner from "@/components/spinner/spinner";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFeeReport, useStudentStandardCOunt } from "@/hooks/use-report";
import React, { useEffect, useState } from "react";

const ReportsPage = () => {
  const [combinedData, setCombinedData] = useState([]);

  const { data, isLoading, error, refetch } = useStudentStandardCOunt();
  let standardDataCount = data?.data;

  const {
    data: reportData,
    isLoading: reportLoading,
    error: reportError,
    refetch: reportRefetch,
  } = useFeeReport();
  let feeReportData = reportData?.data;

  const combineData = () => {
    if (standardDataCount && feeReportData) {
      let totalStudents = 0;
      let totalFees = 0;
      let totalPaid = 0;
      let totalPending = 0;
      let totalWaived = 0;

      const combined = standardDataCount.standards.map((standard) => {
        const feeData = feeReportData.find(
          (fee) => fee.std.toString() === standard.standard.toString()
        );
        const noOfStudents = standard.boys_count + standard.girls_count;
        const total = feeData ? feeData.total : 0;
        const paid = feeData ? feeData.paid : 0;
        const pending = feeData ? feeData.pending : 0;
        const waived = feeData ? feeData.waived : 0;

        totalStudents += noOfStudents;
        totalFees += total;
        totalPaid += paid;
        totalPending += pending;
        totalWaived += waived;

        return {
          standard:
            standard.standard === "13" ? "Balvatika" : standard.standard,
          noOfStudents: noOfStudents,
          total: total,
          paid: paid,
          pending: pending,
          waived: waived,
        };
      });

      // Append the total row
      combined.push({
        standard: "Total",
        noOfStudents: totalStudents,
        total: totalFees,
        paid: totalPaid,
        pending: totalPending,
        waived: totalWaived,
      });

      setCombinedData(combined);
    }
  };

  useEffect(() => {
    combineData();
  }, [standardDataCount, feeReportData]);

  if (isLoading || reportLoading) {
    return <><Spinner/></>;
  }

  if (error || reportError) {
    return <>Error</>;
  }

  return (
    <>
      <h1 className="uppercase text-2xl font-bold mb-4">Report</h1>
      <div>
        <ScrollArea className="rounded-md border max-w-[1280px]">
          <Table className="relative text-center">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center whitespace-nowrap">Standard</TableHead>
                <TableHead className="text-center whitespace-nowrap">No Of Students</TableHead>
                <TableHead className="text-center whitespace-nowrap">Total</TableHead>
                <TableHead className="text-center whitespace-nowrap">Paid</TableHead>
                <TableHead className="text-center whitespace-nowrap">Pending</TableHead>
                <TableHead className="text-center whitespace-nowrap">Waived</TableHead>
                <TableHead className="text-start">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {combinedData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.standard}</TableCell>
                  <TableCell>{data.noOfStudents}</TableCell>
                  <TableCell>{data.total}</TableCell>
                  <TableCell>{data.paid}</TableCell>
                  <TableCell>{data.pending}</TableCell>
                  <TableCell>{data.waived}</TableCell>
                  {data.standard !== "Total" ? (
                    <TableCell className="text-center">
                      {data.standard === "Balvatika" ? (
                        <ActionsPopupReport id="balvatika" />
                      ) : (
                        <ActionsPopupReport id={data.standard} />
                      )}
                    </TableCell>
                  ) : null}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default ReportsPage;
