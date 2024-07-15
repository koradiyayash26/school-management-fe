import { examTemplateGet, examTemplateIdGet } from "@/services/exam-template-service";
import { useQuery } from "@tanstack/react-query";

export const useExamTemplateGet = () => {
  return useQuery({
    queryKey: ["examtemplate_list"],
    queryFn: examTemplateGet,
  });
};

export const useExamTemplateIdGet = (id) => {
  return useQuery({
    queryKey: ["examtemplateid_get",id],
    queryFn:()=>examTemplateIdGet(id),
  });
};

