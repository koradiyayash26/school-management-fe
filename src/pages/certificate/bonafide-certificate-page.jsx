import React, { useState } from "react";
import { format } from "date-fns";
import numWords from "num-words";
import { useParams } from "react-router-dom";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Printer } from "lucide-react";
import { useCertificateGetData } from "@/hooks/use-certificate";
import Spinner from "@/components/spinner/spinner";

const BonafideCertificatePage = () => {
  const { id } = useParams();
  const [todayDate] = useState(format(new Date(), "dd-MM-yyyy"));
  const { data, isLoading, error } = useCertificateGetData(id);
  const studentData = data?.data || {};

  const dateToWords = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");

    const yearWords = numWords(parseInt(year));
    const monthWords = numWords(parseInt(month));
    const dayWords = numWords(parseInt(day));

    return `${yearWords} - ${monthWords} - ${dayWords}`;
  };

  const handleDownloadPdf = () => {
    alert("PDF Downloaded");
  };

  if (isLoading) {
    return <><Spinner/></>;
  }

  if (error) {
    return <>Error: {error.message}</>;
  }

  return (
    <>
      <h1>BONAFIDE CERTIFICATE</h1>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="border border-white-200 rounded-lg shadow-sm">
            <figure className="flex flex-col items-center justify-center p-8 border-b rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e">
              <figcaption className="lg:flex md:flex items-center justify-between block w-full mb-4">
                <div className="mb-6">BONAFIDE CERTIFICATE</div>
                <div className="flex items-center">
                  <div className="w-10 h-10 uppercase p-[20px] bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {studentData.middle_name?.[0] || "N/A"}
                  </div>
                  <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                    <div>
                      {studentData.first_name || "N/A"}&nbsp;{studentData.middle_name || "N/A"}&nbsp;{studentData.last_name || "N/A"}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Birth Date - &nbsp;
                      {studentData.birth_date || "N/A"}
                    </div>
                  </div>
                </div>
              </figcaption>
              <blockquote className="mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                <h3 className="font-semibold my-10 text-gray-900 dark:text-white">
                  <div className="block lg:flex justify-between">
                    <h3 className="mb-2">G.No - 2023/24</h3>
                    <h3>Date - {todayDate}</h3>
                  </div>
                </h3>
                <p className="my-4 break-all">
                  Hence it is written that It is hereby written that&nbsp;
                  <span className="underline">
                    {studentData.gender === "કન્યા" ? "Miss." : "Mrs."}
                  </span>
                  &nbsp;
                  <span className="underline">
                    {studentData.first_name || "N/A"}&nbsp;
                    {studentData.middle_name || "N/A"}&nbsp;
                    {studentData.last_name || "N/A"}
                  </span>
                  &nbsp; is studying in this school in present standard -&nbsp;
                  <span className="underline">
                    {studentData.standard == 13 ? "Balvatika" : studentData.standard || "N/A"}
                  </span>
                  . As per GR No -{" "}
                  <span className="underline">{studentData.grno || "N/A"} </span>
                  of our school his date is&nbsp;
                  <span className="underline">
                    {studentData.birth_date || "N/A"}
                  </span>{" "}
                  and&nbsp;
                  <span className="underline">
                    {dateToWords(studentData.birth_date)}
                  </span>
                  . His caste is{" "}
                  <span className="underline">
                    {studentData.religion || "N/A"}&nbsp;{studentData.caste || "N/A"}
                  </span>
                  . For the assurance of which this certificate is written.
                </p>
              </blockquote>
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

export default BonafideCertificatePage;
