// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import ActionsPopupReport from "./data.-table-row-action";

// const Reports = () => {
//   const [standardDataCount, setStandardDataCount] = useState();
//   const [feeReportData, setFeeReportData] = useState();
//   const [combinedData, setCombinedData] = useState([]);

//   const getStudentCount = async () => {
//     try {
//       const token = localStorage.getItem("Token");
//       const config = { headers: { Authorization: `Token ${token}` } };
//       const response = await axios.get(
//         "http://127.0.0.1:8000/standards/standard-counter/",
//         config
//       );
//       setStandardDataCount(response.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getFeeReport = async () => {
//     try {
//       const token = localStorage.getItem("Token");
//       const config = { headers: { Authorization: `Token ${token}` } };
//       const response = await axios.get(
//         "http://127.0.0.1:8000/fee-report/",
//         config
//       );
//       setFeeReportData(response.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getStudentCount();
//     getFeeReport();
//   }, []);

//   const combineData = () => {
//     if (standardDataCount && feeReportData) {
//       const combined = standardDataCount.standards.map((standard) => {
//         const feeData = feeReportData.find(
//           (fee) => fee.std.toString() === standard.standard.toString()
//         );
//         return {
//           standard: standard.standard,
//           noOfStudents: standard.boys_count + standard.girls_count,
//           total: feeData ? feeData.total : 0,
//           paid: feeData ? feeData.paid : 0,
//           pending: feeData ? feeData.pending : 0,
//           waived: feeData ? feeData.waived : 0,
//         };
//       });
//       setCombinedData(combined);
//       console.log(combined); // Log the combined data
//     }
//   };

//   useEffect(() => {
//     combineData();
//   }, [standardDataCount, feeReportData]);

//   return (
//     <>
//       <div>
//         <ScrollArea className="rounded-md border max-w-[1280px]">
//           <Table className="relative text-center">
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="text-center">Standard</TableHead>
//                 <TableHead className="text-center">No Of Student</TableHead>
//                 <TableHead className="text-center">Total</TableHead>
//                 <TableHead className="text-center">Paid</TableHead>
//                 <TableHead className="text-center">Pending</TableHead>
//                 <TableHead className="text-center">Waived</TableHead>
//                 <TableHead className="text-start">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {combinedData.map((data, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{data.standard}</TableCell>
//                   <TableCell>{data.noOfStudents}</TableCell>
//                   <TableCell>{data.total}</TableCell>
//                   <TableCell>{data.paid}</TableCell>
//                   <TableCell>{data.pending}</TableCell>
//                   <TableCell>{data.waived}</TableCell>
//                   <TableCell className="text-center">
//                     <ActionsPopupReport id={data.standard} />
//                   </TableCell>
//                 </TableRow>
//               ))}
//               <TableRow>
//                 <TableCell colSpan="2" className="text-center">
//                   Total
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//           <ScrollBar orientation="horizontal" />
//         </ScrollArea>
//       </div>
//     </>
//   );
// };

// export default Reports;


import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ActionsPopupReport from "./data.-table-row-action";

const Reports = () => {
  const [standardDataCount, setStandardDataCount] = useState();
  const [feeReportData, setFeeReportData] = useState();
  const [combinedData, setCombinedData] = useState([]);

  const getStudentCount = async () => {
    try {
      const token = localStorage.getItem("Token");
      const config = { headers: { Authorization: `Token ${token}` } };
      const response = await axios.get(
        "http://127.0.0.1:8000/standards/standard-counter/",
        config
      );
      setStandardDataCount(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFeeReport = async () => {
    try {
      const token = localStorage.getItem("Token");
      const config = { headers: { Authorization: `Token ${token}` } };
      const response = await axios.get(
        "http://127.0.0.1:8000/fee-report/",
        config
      );
      setFeeReportData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudentCount();
    getFeeReport();
  }, []);

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
          standard: standard.standard === "13" ? "Balvatika" : standard.standard,
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
      console.log(combined); // Log the combined data
    }
  };

  useEffect(() => {
    combineData();
  }, [standardDataCount, feeReportData]);

  return (
    <>
      <div>
        <ScrollArea className="rounded-md border max-w-[1280px]">
          <Table className="relative text-center">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Standard</TableHead>
                <TableHead className="text-center">No Of Students</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">Paid</TableHead>
                <TableHead className="text-center">Pending</TableHead>
                <TableHead className="text-center">Waived</TableHead>
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
                  <TableCell className="text-center">
                    <ActionsPopupReport id={data.standard} />
                  </TableCell>
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

export default Reports;
