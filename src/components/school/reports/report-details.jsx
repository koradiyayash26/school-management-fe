// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import React from "react";
// import { useParams } from "react-router-dom";

// const getReportStandardData = async (id) => {
//   const token = localStorage.getItem("Token");

//   const config = {
//     headers: {
//       Authorization: `Token ${token}`,
//     },
//   };
//   const res = await axios.get(
//     `http://127.0.0.1:8000/report/standard/${id}`,
//     config
//   );
//   return res.data;
// };

// const headers = [
//   //   { label: "name", value: "name" },
//   { label: "GR Number", value: "student__grno" },
//   { label: "First Name", value: "student__first_name" },
//   { label: "Middle Name", value: "student__middle_name" },
//   { label: "Last Name", value: "student__last_name" },
//   { label: "City", value: "student__city" },
//   { label: "Standard", value: "student__standard" },
//   { label: "Total", value: "total" },
//   { label: "Paid", value: "paid" },
//   { label: "Waived", value: "waived" },
// ];
// const ReportDetails = () => {
//   let { id } = useParams();
//   if (id === "balvatika") {
//     id = 13;
//   }

//   const { data, isLoading } = useQuery({
//     queryKey: ["reportdata", id],
//     queryFn: () => getReportStandardData(id),
//   });

//   if (isLoading) {
//     return <>Loading...</>;
//   }

//   const students = data?.data;

//   // when to used for combine of all name in name file to used also add on above header name lable or value

//   //   const students = data?.data.map((student) => ({
//   //     ...student,
//   //     name: `${student.student__first_name} ${student.student__middle_name} ${student.student__last_name}`,
//   //   }));

//   return (
//     <>
//       <div>
//         <ScrollArea className="rounded-md border max-w-[1280px]">
//           <Table className="relative text-center">
//             <TableHeader>
//               <TableRow>
//                 {headers.map((header, index) => (
//                   <TableHead className="text-center" key={index}>
//                     {header.label}
//                   </TableHead>
//                 ))}
//                 <TableHead className="text-center">Due</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {students.map((data, index) => (
//                 <TableRow key={index}>
//                   {headers.map((header) => (
//                     <TableCell key={header.value}>
//                       {/* {data[header.value]} */}
//                       {header.value === "student__standard" &&
//                       data[header.value] == 13
//                         ? "Balvatika"
//                         : data[header.value]}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <ScrollBar orientation="horizontal" />
//         </ScrollArea>
//       </div>
//     </>
//   );
// };

// export default ReportDetails;

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const getReportStandardData = async (id) => {
  const token = localStorage.getItem("Token");

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  const res = await axios.get(
    `http://127.0.0.1:8000/report/standard/${id}`,
    config
  );
  return res.data;
};

const headers = [
  //   { label: "name", value: "name" },
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

const ReportDetails = () => {
  let { id } = useParams();
  if (id === "balvatika") {
    id = 13;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["reportdata", id],
    queryFn: () => getReportStandardData(id),
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  // Combine the names and calculate the due amount for each student
  const students = data?.data.map((student) => ({
    ...student,
    // name: `${student.student__first_name} ${student.student__middle_name} ${student.student__last_name}`,
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
                      data[header.value] == 13
                        ? "Balvatika"
                        : data[header.value]}
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

export default ReportDetails;
