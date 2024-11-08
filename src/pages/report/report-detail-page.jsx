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
import { useReport } from "@/hooks/use-report";
import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getToken } from "@/utils/token";
import apiClient from "@/lib/api-client";

const ReportDetailsPage = () => {
  let { id } = useParams();
  if (id === "balvatika") {
    id = 13;
  }
  const { data, isLoading, error } = useReport(id);

  const handleDownloadExcel = async () => {
    try {
      const response = await apiClient.get(`/report/fee-report-excel/${id}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `FeeReport_Standard-${id}.xlsx`;
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    }
  };

  const handleDownloadExcelEachFeetype = async (feeTypeName,feeTypeId) => {
    try {
      const response = await apiClient.get(`/report/fee-type-report-excel/${id}/${feeTypeId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${feeTypeName} FeeReport_Standard - ${id}.xlsx`;
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <>Error fetching data</>;
  }

  const { students, fee_types, totals, standard } = data.data;

  return (
    <div className="container mx-auto px-4 pb-8">
      <h1 className="uppercase md:text-2xl text-sm font-bold mb-4">
        Fee Report - Standard {standard}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-wrap gap-4 mt-8 mb-6">
        <div className="">
          <Button
            onClick={handleDownloadExcel}
            className="w-full"
            disabled={totals?.total_fee === 0}
          >
            Generate Excel All
          </Button>
        </div>
        {fee_types?.map((feeType) => (
          <div key={feeType.id} className="w-full sm:w-auto">
            <Button 
              onClick={() => handleDownloadExcelEachFeetype(feeType.name,feeType.id)} 
              className="w-full" 
              variant="outline"
            >
              {feeType.name} / Excel
            </Button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-4 md:gap-4 gap-2 md:gap-y-0 lg:gap-y-0 gap-y-0">
        <div className="mb-8 shadow-xxl shadow-white border-muted-foreground border rounded-lg overflow-hidden">
          <div className="p-5 grid grid-cols-2 md:grid-cols-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Total Fees
              </p>
              <p className="text-2xl font-bold dark:text-white text-black">
                ₹{totals?.total_fee?.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="mb-8 shadow-xxl shadow-white border-muted-foreground border rounded-lg overflow-hidden">
          <div className="p-5 grid grid-cols-2 md:grid-cols-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Paid Fees
              </p>
              <p className="text-2xl font-bold dark:text-white text-black">
                ₹{totals?.paid?.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="mb-8 shadow-xxl shadow-white border-muted-foreground border rounded-lg overflow-hidden">
          <div className="p-5 grid grid-cols-2 md:grid-cols-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Pending Fees
              </p>
              <p className="text-2xl font-bold dark:text-white text-black">
                ₹{totals?.pending?.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="mb-8 shadow-xxl shadow-white border-muted-foreground border rounded-lg overflow-hidden">
          <div className="p-5 grid grid-cols-2 md:grid-cols-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Waived Fees
              </p>
              <p className="text-2xl font-bold dark:text-white text-black">
                ₹{totals?.waived?.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Student Details */}
      <ScrollArea className="rounded-md">
        {students?.map((student) => (
          <div
            key={student.gr_no}
            className="mb-8 rounded-lg overflow-hidden border"
          >
            <h3 className="text-lg font-semibold px-6 py-3">
              {student.first_name} {student.last_name} (Gr No: {student.gr_no})
            </h3>
            <div className="pb-6 pr-6 pl-6 py-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Fee
                  </p>
                  <p className="text-xl font-bold ">
                    ₹{student.total_fee?.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Paid
                  </p>
                  <p className="text-xl font-bold ">
                    ₹{student.paid?.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Pending
                  </p>
                  <p className="text-xl font-bold ">
                    ₹{student.pending?.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Waived
                  </p>
                  <p className="text-xl font-bold ">
                    ₹{student.waived?.toFixed(2)}
                  </p>
                </div>
              </div>

              <ScrollArea className="rounded-md border">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="text-left whitespace-nowrap">
                        Fee Type
                      </TableHead>
                      <TableHead className="text-left whitespace-nowrap">
                        Amount
                      </TableHead>
                      <TableHead className="text-left whitespace-nowrap">
                        Paid
                      </TableHead>
                      <TableHead className="text-left whitespace-nowrap">
                        Waived
                      </TableHead>
                      <TableHead className="text-left whitespace-nowrap">
                        Pending
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(student.fee_structures || {}).map(
                      ([feeType, feeData]) => (
                        <TableRow key={feeType} className="">
                          <TableCell className="whitespace-nowrap">
                            {feeType}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            ₹{feeData.amount?.toFixed(2)}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            ₹{feeData.paid?.toFixed(2)}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            ₹{feeData.waived?.toFixed(2)}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            ₹{feeData.pending?.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>
        ))}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default ReportDetailsPage;
