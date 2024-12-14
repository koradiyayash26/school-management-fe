import React, { useState } from "react";
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
import { useStandardMasterList } from "@/hooks/use-standard-master";
import ActionsPopupSettings from "@/components/settings/data-table-row-action";
import { BreadcrumbComponent } from "@/components/Breadcrumb";

const headers = [
  { label: "ID", value: "id" },
  { label: "Standard", value: "name" },
  { label: "Class", value: "school_type" },
];

function StandardMasterList() {
  const { data, isLoading, error, refetch } = useStandardMasterList();
  const standards = data || [];

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
          { label: "Standard master" },
        ]}
      />
      {/* PAth */}
      <h1 className="uppercase text-2xl font-bold mb-4">
        Standard Master List
      </h1>
      <div className="block md:flex md:justify-between gap-2">
        <div className="flex gap-2 md:m-0 mt-4">
          <Link to="/setting/standard-master/add">
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
            {standards.map((std) => (
              <TableRow key={std.id}>
                {headers.map((header) => (
                  <TableCell key={header.value} className="capitalize">
                    {header.value === "name" && std[header.value] === "13"
                      ? "Balvatika"
                      : std[header.value] || "None"}
                  </TableCell>
                ))}
                <TableCell>
                  <ActionsPopupSettings id={std.id} mode="standard" />
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

export default StandardMasterList;
