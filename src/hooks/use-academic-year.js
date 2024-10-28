import { getAcademicYearList } from "@/services/academic-year-service";
import { useQuery } from "@tanstack/react-query";
  
export const useAcademicYear = () => {
    return useQuery({
      queryKey: ["academic-year"],
      queryFn: getAcademicYearList,
    });
  };