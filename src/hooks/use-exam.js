import { getExam, getExamMarksData, getIdExam } from "@/services/exam-service";
import { useQuery } from "@tanstack/react-query";

export const useExam = () => {
  return useQuery({
    queryKey: ["exam"],
    queryFn: getExam,
  });
};

export const useExamList = () => {
  return useQuery({
    queryKey: ["examlist"],
    queryFn: getExamMarksData,
  });
};

export const useGetExam = (id) => {
  return useQuery({
    queryKey: ["examget", id],
    queryFn: () => getIdExam(id),
  });
};

