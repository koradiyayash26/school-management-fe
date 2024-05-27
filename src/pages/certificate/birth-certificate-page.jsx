import axios from "axios";
import { format } from "date-fns";
import numWords from "num-words";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Printer } from "lucide-react";

const BirthCertificatePage = () => {
  const { id } = useParams();
  const [studentData, setStudentData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [todayDate, setTodayDate] = useState(format(new Date(), "dd-MM-yyyy"));

  const dateToWords = (dateStr) => {
    const [year, month, day] = dateStr.split("-");

    const yearWords = numWords(parseInt(year));
    const monthWords = numWords(parseInt(month));
    const dayWords = numWords(parseInt(day));

    return `${yearWords} - ${monthWords} - ${dayWords}`;
  };
  const getData = () => {
    const token = localStorage.getItem("Token");
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    setIsLoading(true);
    return axios
      .get(`http://127.0.0.1:8000/students/${id}/search/`, config)
      .then(function (response) {
        setStudentData(response.data.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, [id]);

  const handleDownloadPdf = () => {
    alert("PDF Downloaded");
  };

  if (isLoading) {
    return <>Loading</>;
  }
  return (
    <>
      <h1>BIRTH CERTIFICATE</h1>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="border border-white-200 rounded-lg shadow-sm    ">
            <figure className="flex flex-col items-center justify-center p-8 border-b rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e">
              <figcaption className="lg:flex md:flex items-center justify-between block  w-full mb-4  ">
                <div className="mb-6">BIRTH CERTIFICATE</div>
                <div className="flex items-center">
                  <div className="w-10 h-10 uppercase bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {studentData.middle_name[0]}
                  </div>
                  <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                    <div>
                      {studentData.first_name}&nbsp; {studentData.middle_name}
                      &nbsp;{studentData.last_name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 ">
                      Birth Date - &nbsp;
                      {studentData.birth_date}
                    </div>
                  </div>
                </div>
              </figcaption>
              <blockquote className="mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                <h3 className="font-semibold my-10 text-gray-900 dark:text-white">
                  <div className="block lg:flex justify-between">
                    <h3 className="mb-2">G.No - 2023/24</h3>
                    {/* <h3>Date - {todayDate}</h3> */}
                  </div>
                </h3>
                <p className="my-4 break-all">
                  This is to certify that&nbsp;
                  <span className="underline">
                    {studentData.gender === "કન્યા" ? "Miss." : "Mrs."}
                  </span>
                  &nbsp;
                  <span className="underline">
                    {studentData.first_name}&nbsp;
                    {studentData.middle_name}&nbsp;
                    {studentData.last_name}
                  </span>
                  &nbsp; is studying in this school. And His Birth Date is&nbsp;
                  <span className="underline">{studentData.birth_date}</span>
                  &nbsp;and&nbsp;
                  <span className="underline">
                    {dateToWords(studentData.birth_date)}
                  </span>
                  &nbsp; In return this certificate is given.
                </p>
              </blockquote>
              <h3 className="font-semibold w-full my-10 text-gray-900 dark:text-white">
                <div className="block lg:flex justify-between">
                  <h3 className="mb-2">
                    PLACE - MANDAVADHAR
                    <div>DATE - 2023/24</div>
                  </h3>
                  <h3>PRINCIPAL SING</h3>
                </div>
              </h3>
            </figure>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={handleDownloadPdf}>
            <Printer className="w-4 h-4 mr-2" />
            PDF
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
};

export default BirthCertificatePage;
