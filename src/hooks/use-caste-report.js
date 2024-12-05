import { getCasteReportData } from "@/services/caste-report-service";
import { useQuery } from "@tanstack/react-query";

export const useCasteReport = () => {
  return useQuery({
    queryKey: ["caste-report"],
    queryFn: getCasteReportData,
  });
};
