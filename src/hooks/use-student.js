import { getStudents } from "@/services/student-service";
import { useQuery } from "@tanstack/react-query";

export const useStudents = () => {
  return useQuery({
    queryKey: ["gr"],
    queryFn: getStudents,
  });
};
