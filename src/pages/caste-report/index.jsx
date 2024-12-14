import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCasteReport } from "@/hooks/use-caste-report";
import Spinner from "@/components/spinner/spinner";
import { BreadcrumbComponent } from "@/components/Breadcrumb";

export function CasteReport() {
  const { data, isLoading, refetch } = useCasteReport();

  let reportData = data || [];

  if (isLoading) {
    return <Spinner />;
  }

  const { report_data, overall_totals, grand_total } = reportData?.data || {};

  return (
    <>
      {" "}
      {/* PAth */}
      <BreadcrumbComponent customItems={[{ label: "Caste report" }]} />
      {/* PAth */}
      <div className="container mx-auto p-0 space-y-6">
        <h1 className="uppercase text-2xl font-bold mb-4">Caste Report</h1>
        {/* Overall Total Card */}
        <Card>
          <CardHeader className="bg-gradient-to-r border-b">
            <CardTitle className="dark:text-white whitespace-nowrap uppercase">
              Overall Total
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="w-full">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[200px] whitespace-nowrap">
                      Category
                    </TableHead>
                    <TableHead className="text-center whitespace-nowrap">
                      Male
                    </TableHead>
                    <TableHead className="text-center whitespace-nowrap">
                      Female
                    </TableHead>
                    <TableHead className="text-center whitespace-nowrap">
                      Total
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(overall_totals || {}).map(
                    ([category, data]) => (
                      <TableRow key={category}>
                        <TableCell className="font-medium whitespace-nowrap">
                          {category}
                        </TableCell>
                        <TableCell className="text-center whitespace-nowrap">
                          {data.male}
                        </TableCell>
                        <TableCell className="text-center whitespace-nowrap">
                          {data.female}
                        </TableCell>
                        <TableCell className="text-center whitespace-nowrap">
                          {data.total}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                  <TableRow className="bg-muted/50 font-semibold">
                    <TableCell className="whitespace-nowrap">
                      Grand Total
                    </TableCell>
                    <TableCell className="text-center">
                      {grand_total?.male}
                    </TableCell>
                    <TableCell className="text-center">
                      {grand_total?.female}
                    </TableCell>
                    <TableCell className="text-center">
                      {grand_total?.total}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
        {/* Standard-wise Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {report_data?.map((standard) => (
            <Card key={standard.standard}>
              <CardHeader className="bg-gradient-to-r border-b">
                <CardTitle className="dark:text-white uppercase">
                  Standard -{" "}
                  {standard.standard == 13 ? "Balvatika" : standard.standard}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="w-full">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="w-[200px] whitespace-nowrap">
                          Category
                        </TableHead>
                        <TableHead className="text-center whitespace-nowrap">
                          Male
                        </TableHead>
                        <TableHead className="text-center whitespace-nowrap">
                          Female
                        </TableHead>
                        <TableHead className="text-center whitespace-nowrap">
                          Total
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(standard.categories).map(
                        ([category, data]) => (
                          <TableRow key={category}>
                            <TableCell className="font-medium whitespace-nowrap">
                              {category}
                            </TableCell>
                            <TableCell className="text-center">
                              {data.male}
                            </TableCell>
                            <TableCell className="text-center">
                              {data.female}
                            </TableCell>
                            <TableCell className="text-center">
                              {data.total}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                      <TableRow className="bg-muted/50 font-semibold">
                        <TableCell>Total</TableCell>
                        <TableCell className="text-center">
                          {standard.total.male}
                        </TableCell>
                        <TableCell className="text-center">
                          {standard.total.female}
                        </TableCell>
                        <TableCell className="text-center">
                          {standard.total.total}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
