import { examTemplateGet, examTemplateGetStudents, examTemplateIdGet, examTemplateStudentGetForPatch } from "@/services/exam-template-service";
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


export const useExamTemplateGetStudentsForPatch = (id,std) => {
  return useQuery({
    queryKey: ["examtemplate_patch_students",id,std],
    queryFn:()=>examTemplateStudentGetForPatch(id,std),
  });
};
