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
import ActionsPopupSettings from "@/components/settings/data-table-row-action";
import { useFeeTypeMasterList } from "@/hooks/use-fee-type-master";

const headers = [
  { label: "ID", value: "id" },
  { label: "Standard", value: "name" },
];

function FeeTypeMasterList() {
  const { data, isLoading, error, refetch } = useFeeTypeMasterList();
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
      <h1>Fee Type Master List</h1>
      <div className="block md:flex md:justify-between gap-2">
        <div className="flex gap-2 md:m-0 mt-4">
          <Link to="/setting/fee-type-master/add">
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
            {feeTypeMaster.map((fee) => (
              <TableRow key={fee.id}>
                {headers.map((header) => (
                  <TableCell key={header.value} className="capitalize">
                    {fee[header.value] || "None"}
                  </TableCell>
                ))}
                <TableCell>
                  <ActionsPopupSettings id={fee.id} mode="fee-type" />
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

export default FeeTypeMasterList;
