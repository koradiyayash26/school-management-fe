import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useReport } from "@/hooks/use-report";
import React from "react";
import { useParams } from "react-router-dom";

const headers = [
  { label: "GR Number", value: "student__grno" },
  { label: "First Name", value: "student__first_name" },
  { label: "Middle Name", value: "student__middle_name" },
  { label: "Last Name", value: "student__last_name" },
  { label: "City", value: "student__city" },
  { label: "Standard", value: "student__standard" },
  { label: "Total", value: "total" },
  { label: "Paid", value: "paid" },
  { label: "Waived", value: "waived" },
  { label: "Due", value: "due" },
];

const ReportDetailsPage = () => {
  let { id } = useParams();
  if (id === "balvatika") {
    id = 13;
  }
  const { data, isLoading, error } = useReport(id);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error fetching data</>;
  }

  const students = data.data.map((student) => ({
    ...student,
    due: student.total - student.paid - student.waived,
  }));

  return (
    <>
      <h1 className="uppercase">Report Standard</h1>
      <div>
        <ScrollArea className="rounded-md border max-w-[1280px]">
          <Table className="relative text-center">
            <TableHeader>
              <TableRow>
                {headers.map((header, index) => (
                  <TableHead className="text-center" key={index}>
                    {header.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((data, index) => (
                <TableRow key={index}>
                  {headers.map((header) => (
                    <TableCell key={header.value}>
                      {header.value === "student__standard" &&
                      data[header.value] === "13"
                        ? "Balvatika"
                        : data[header.value] || 0}
                    </TableCell>
                  ))}
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

export default ReportDetailsPage;
