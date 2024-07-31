import { useQuery } from "@tanstack/react-query";
import {
  getFeeReport,
  getReportStandardCount,
  getReportStandardData,
} from "@/services/report-service";

export const useReport = (id) => {
  return useQuery({
    queryKey: ["report", id],
    queryFn: () => getReportStandardData(id),
    enabled: !!id, // Ensure the query runs only if id is truthy
  });
};

export const useStudentStandardCOunt = () => {
  return useQuery({
    queryKey: ["reportstandardcount"],
    queryFn: () => getReportStandardCount(),
  });
};

export const useFeeReport = () => {
  return useQuery({
    queryKey: ["usefeereport"],
    queryFn: () => getFeeReport(),
  });
};
