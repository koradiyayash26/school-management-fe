import { examTemplateGet } from "@/services/exam-template-service";
import { useQuery } from "@tanstack/react-query";

export const useExamTemplateGet = () => {
  return useQuery({
    queryKey: ["examtemplate_list"],
    queryFn: examTemplateGet,
  });
};