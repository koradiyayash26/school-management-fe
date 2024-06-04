import { getStudentHistoricalGetData } from "@/services/student-historical-service";
import { useQuery } from "@tanstack/react-query";

export const useStudentHistorical = () => {
  return useQuery({
    queryKey: ["studenthistorical"],
    queryFn: getStudentHistoricalGetData,
  });
};
