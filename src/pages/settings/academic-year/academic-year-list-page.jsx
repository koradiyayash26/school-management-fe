import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import Spinner from "@/components/spinner/spinner";
import ActionsPopupSettings from "@/components/settings/data-table-row-action";
import { useAcademicYear } from "@/hooks/use-academic-year";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { BreadcrumbComponent } from "@/components/Breadcrumb";

const headers = [
  { label: "ID", value: "id" },
  { label: "Year", value: "year" },
  { label: "Status", value: "is_current" },
];

function AcademicYearList() {
  const { data, isLoading, error, refetch } = useAcademicYear();
  const feeTypeMaster = data || [];

  if (isLoading)
    return (
      <>
        <Spinner />
      </>
    );

  if (error) return <>Error</>;

  return (
    <>
      {/* PAth */}
      <BreadcrumbComponent
        customItems={[
          { label: "Settings", path: "/setting" },
          { label: "Academic year" },
        ]}
      />
      {/* PAth */}
      <h1 className="uppercase text-2xl font-bold mb-4">Academic Year List</h1>
      <Alert className="">
        <AlertTitle>Note :</AlertTitle>
        <AlertDescription>
          If Multiple Year Status Active Than Display Data Of Last Changes.
        </AlertDescription>
      </Alert>
      <div className="block md:flex md:justify-between gap-2">
        <div className="flex gap-2 md:m-0 mt-4">
          <Link to="/setting/academic-year/add">
            <Button>Add</Button>
          </Link>
        </div>
      </div>
      <ScrollArea className="rounded-md border">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index}>{header.label}</TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feeTypeMaster.map((year) => (
              <TableRow key={year.id}>
                {headers.map((header) => (
                  <TableCell
                    key={header.value}
                    className="capitalize whitespace-nowrap"
                  >
                    {header.value === "is_current" ? (
                      year[header.value] ? (
                        <span className="bg-green-600 text-white px-2 py-1 rounded-sm">
                          Active
                        </span>
                      ) : (
                        "-"
                      )
                    ) : (
                      year[header.value] || "-"
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  <ActionsPopupSettings id={year.id} mode="academic-year" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}

export default AcademicYearList;
