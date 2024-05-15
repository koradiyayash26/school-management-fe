// import React, { useEffect, useState } from "react";
// import { Button } from "../ui/button";
// import axios from "axios";
// import { FaFemale, FaMale } from "react-icons/fa";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { Link } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { Progress } from "../ui/progress";
// import { ClipboardList } from "lucide-react";

// const standard = [
//   { std: "Balvatika", url: "/standard/Balvatika" },
//   { std: "1", url: "/standard/1" },
//   { std: "2", url: "/standard/2" },
//   { std: "3", url: "/standard/3" },
//   { std: "4", url: "/standard/4" },
//   { std: "5", url: "/standard/5" },
//   { std: "6", url: "/standard/6" },
//   { std: "7", url: "/standard/7" },
//   { std: "8", url: "/standard/8" },
// ];

// const Standard = () => {
//   const [standardData, setStandardData] = useState({});
//   const [standardDataCount, setStandardDataCount] = useState();

//   const getData = async () => {
//     try {
//       const token = localStorage.getItem("Token");
//       const config = { headers: { Authorization: `Token ${token}` } };
//       const response = await axios.get(
//         "http://127.0.0.1:8000/standard-count/",
//         config
//       );
//       setStandardData(response.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

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

//   useEffect(() => {
//     getStudentCount();
//   }, []);

//   return (
//     <>
//       <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-2">
//         {standard.map((std, index) => (
//           <div className="text-center" key={index}>
//             <Link to={std.url}>
//               <Button variant="secondary" className="w-[90px]">
//                 {std.std}
//               </Button>
//             </Link>
//             {standardData && standardData[std.std] !== undefined && (
//               <div className="underline mt-2">{standardData[std.std]}</div>
//             )}
//           </div>
//         ))}
//       </div>
//       {/* Student Count Table */}
//       <div className="w-full lg:w-[500px]">
//         <div>
//           <Table className="">
//             <TableCaption>
//               All Standard Boys And Girls Total See Here.
//             </TableCaption>
//             <TableHeader className="bg-muted">
//               <TableRow>
//                 <TableHead className="text-center text-normal lg:text-base text-white">
//                   Standard
//                 </TableHead>
//                 <TableHead className="text-center text-normal lg:text-base text-white">
//                   Boys
//                 </TableHead>
//                 <TableHead className="text-center text-normal lg:text-base text-white">
//                   Girls
//                 </TableHead>
//                 <TableHead className="text-center text-normal lg:text-base text-white">
//                   Total
//                 </TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {standardDataCount &&
//                 standardDataCount.standards.map((standard) => (
//                   <TableRow key={standard.standard}>
//                     <TableCell className="text-center">
//                       {standard.standard}
//                     </TableCell>
//                     <TableCell className="text-center">
//                       {standard.boys_count}
//                     </TableCell>
//                     <TableCell className="text-center">
//                       {standard.girls_count}
//                     </TableCell>
//                     <TableCell className="text-center">
//                       {standard.boys_count + standard.girls_count}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//             <TableFooter>
//               <TableRow>
//                 <TableCell className="text-center">Total</TableCell>
//                 <TableCell className="text-center">
//                   {standardDataCount ? standardDataCount.total_boys : "-"}
//                 </TableCell>
//                 <TableCell className="text-center">
//                   {standardDataCount ? standardDataCount.total_girls : "-"}
//                 </TableCell>
//                 <TableCell className="text-center">
//                   {standardDataCount ? standardDataCount.total_students : "-"}
//                 </TableCell>
//               </TableRow>
//             </TableFooter>
//           </Table>
//         </div>
//       </div>
//       <div>
//         <Card className="lg:w-[350px]">
//           <CardHeader>
//             <CardTitle>Balvatika</CardTitle>
//             <CardDescription>
//               The Display Data Of Balvatika Students.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form>
//               <div className="grid w-full items-center gap-4">
//                 <div className="flex flex-col space-y-1.5">
//                   <span className="text-sm text-muted-foreground">
//                     <FaMale className="inline h-5 w-5 mr-1" />
//                     <Label htmlFor="Boys">Boys</Label> - 88
//                   </span>
//                   <Progress value="88" className="w-[60%]" />
//                 </div>
//                 <div className="flex flex-col space-y-1.5">
//                   <span className="text-sm text-muted-foreground">
//                     <FaFemale className="inline h-5 w-5 mr-1" />
//                     <Label htmlFor="Girls">Girls</Label> - 8
//                   </span>
//                   <Progress value="8" className="w-[60%]" />
//                 </div>
//                 <div className="flex flex-col space-y-1.5">
//                   <Label htmlFor="Total">Total</Label>
//                   <span>36</span>
//                   {/* <Progress value="100" className="w-[60%]" /> */}
//                 </div>
//               </div>
//             </form>
//           </CardContent>
//           <CardFooter className="flex justify-between">
//             <Button>
//               <ClipboardList className="h-4 w-4 mr-2" />
//               <span className="">Get List</span>
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     </>
//   );
// };

// export default Standard;

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { FaFemale, FaMale } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { ClipboardList } from "lucide-react";

const standard = [
  { std: "Balvatika", url: "/standard/Balvatika" },
  { std: "1", url: "/standard/1" },
  { std: "2", url: "/standard/2" },
  { std: "3", url: "/standard/3" },
  { std: "4", url: "/standard/4" },
  { std: "5", url: "/standard/5" },
  { std: "6", url: "/standard/6" },
  { std: "7", url: "/standard/7" },
  { std: "8", url: "/standard/8" },
];

const Standard = () => {
  const [standardData, setStandardData] = useState({});
  const [standardDataCount, setStandardDataCount] = useState();

  const getData = async () => {
    try {
      const token = localStorage.getItem("Token");
      const config = { headers: { Authorization: `Token ${token}` } };
      const response = await axios.get(
        "http://127.0.0.1:8000/standard-count/",
        config
      );
      setStandardData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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

  useEffect(() => {
    getStudentCount();
  }, []);

  return (
    <>
      <h1 className="uppercase">STANDARD'S INFORMATION</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {standardDataCount &&
          standardDataCount.standards.map((standard, index) => (
            <Card className="" key={index}>
              <CardHeader>
                <CardTitle>{standard.standard}</CardTitle>
                <CardDescription>
                  The Display Data Of {standard.standard}&nbsp;Students.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <span className="text-sm text-muted-foreground">
                        <FaMale className="inline h-5 w-5 mr-1" />
                        <Label htmlFor="Male">Male</Label> -&nbsp;
                        {standard.boys_count}
                      </span>
                      <Progress
                        value={standard.boys_count}
                        className="w-[60%]"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <span className="text-sm text-muted-foreground">
                        <FaFemale className="inline h-5 w-5 mr-1" />
                        <Label htmlFor="Female">Female</Label> -&nbsp;
                        {standard.girls_count}
                      </span>
                      <Progress
                        value={standard.girls_count}
                        className="w-[60%]"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="Total">Total</Label>
                      <span> {standard.boys_count + standard.girls_count}</span>
                      {/* <Progress value="100" className="w-[60%]" /> */}
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link to={standard.standard}>
                  <Button>
                    <ClipboardList className="h-4 w-4 mr-2" />
                    <span className="">Get List</span>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        <Card className="">
          <CardHeader>
            <CardTitle>Total</CardTitle>
            <CardDescription>The Display Data Of All Students.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <span className="text-sm text-muted-foreground">
                  <FaMale className="inline h-5 w-5 mr-1" />
                  <Label htmlFor="Boys">Total Male</Label> -&nbsp;
                  {standardDataCount ? standardDataCount.total_boys : "-"}
                </span>
                <Progress
                  value={standardDataCount ? standardDataCount.total_boys : "-"}
                  className="w-[60%]"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <span className="text-sm text-muted-foreground">
                  <FaFemale className="inline h-5 w-5 mr-1" />
                  <Label htmlFor="Girls">Total Female</Label> -&nbsp;
                  {standardDataCount ? standardDataCount.total_girls : "0"}
                </span>
                <Progress
                  value={
                    standardDataCount ? standardDataCount.total_girls : "0"
                  }
                  className="w-[60%]"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Total">Total Student's</Label>
                <span>
                  {standardDataCount ? standardDataCount.total_students : "0"}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link to="/student">
              <Button>
                <ClipboardList className="h-4 w-4 mr-2" />
                <span className="">Get List</span>
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Standard;
