import { examTemplateGet, examTemplateGetStudents, examTemplateIdGet } from "@/services/exam-template-service";
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

export const useExamTemplateGetStudents = (id,std) => {
  return useQuery({
    queryKey: ["examtemplate_get_students",id,std],
    queryFn:()=>examTemplateGetStudents(id,std),
  });
};

