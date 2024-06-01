import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { useParams } from "react-router-dom";

const PaymentFeeFormPage = () => {
  const { id, year } = useParams();
  return (
    <div>
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
                Name: RAJ VINODBHAI PATEL
              </TableCell>
              <TableCell className="text-center border">
                Standard: Balvatika
              </TableCell>
              <TableCell className="text-center border">Section: A</TableCell>
              <TableCell className="text-center border">
                Address: None
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <ScrollArea className="rounded-md border mt-6 max-w-[1280px]">
        <Table className="relative">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-center border">STD</TableHead>
              <TableHead className="text-center border">Fee Type</TableHead>
              <TableHead className="text-center border">Total Amt.</TableHead>
              <TableHead className="text-center border">Paid Amt.</TableHead>
              <TableHead className="text-center border">Waived</TableHead>
              <TableHead className="text-center border">Due Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center border">Balvatika</TableCell>
              <TableCell className="text-center border">BUSS FEE</TableCell>
              <TableCell className="text-center border">1000</TableCell>
              <TableCell className="text-center border">0</TableCell>
              <TableCell className="text-center border">0</TableCell>
              <TableCell className="text-center border">1000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan="2" className="text-center border">
                TOTAL
              </TableCell>
              <TableCell className="text-center border">1000</TableCell>
              <TableCell className="text-center border">0</TableCell>
              <TableCell className="text-center border">0</TableCell>
              <TableCell className="text-center border">1000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center border"></TableCell>
              <TableCell className="text-center border">Date:</TableCell>
              <TableCell className="text-center border">31-02-2005</TableCell>
              <TableCell className="text-center border">Note:</TableCell>
              <TableCell className="text-center border">None</TableCell>
              <TableCell className="text-center border">
                <Button>Submit</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <h1 className="my-6 text-xl">FEE HISTORY</h1>
      <ScrollArea className="rounded-md border mt-6 max-w-[1280px]">
        <Table className="relative">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-center border">Date</TableHead>
              <TableHead className="text-center border">Standard</TableHead>
              <TableHead className="text-center border">Name</TableHead>
              <TableHead className="text-center border">Grno.</TableHead>
              <TableHead className="text-center border">
                Certificate No
              </TableHead>
              <TableHead className="text-center border">Amount</TableHead>
              <TableHead className="text-center border">Note</TableHead>
              <TableHead className="text-center border">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center border">Balvatika</TableCell>
              <TableCell className="text-center border">BUSS FEE</TableCell>
              <TableCell className="text-center border">1000</TableCell>
              <TableCell className="text-center border">0</TableCell>
              <TableCell className="text-center border">0</TableCell>
              <TableCell className="text-center border">1000</TableCell>
              <TableCell className="text-center border">None</TableCell>
              <TableCell className="text-center border">DELETE</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default PaymentFeeFormPage;
