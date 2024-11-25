import {
  getAcademicYearData,
  getAcademicYearList,
} from "@/services/academic-year-service";
import { useQuery } from "@tanstack/react-query";

export const useAcademicYear = () => {
  return useQuery({
    queryKey: ["academic-year"],
    queryFn: getAcademicYearList,
  });
};

export const useAcademicYearGetData = (id) => {
  return useQuery({
    queryKey: ["academic-year-data", id],
    queryFn: () => getAcademicYearData(id),
    onError: (error) => {
      console.error("Error fetching academic year data:", error);
    },
  });
};
