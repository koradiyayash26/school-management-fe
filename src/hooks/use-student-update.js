import { getStudentUpdateStdYearData, getStudentUpdateTemplateData } from "@/services/student-update";
import { useQuery } from "@tanstack/react-query";

export const useStudentUpdateStdYearTemplate = () => {
  return useQuery({
    queryKey: ["studentupdatetemplate"],
    queryFn: getStudentUpdateTemplateData,
  });
};

export const useStudentUpdateStdYearData = (standard,year) => {
  return useQuery({
    queryKey: ["studentupdatestdyeardata",standard,year],
    queryFn: ()=>getStudentUpdateStdYearData(standard,year),
  });
};
